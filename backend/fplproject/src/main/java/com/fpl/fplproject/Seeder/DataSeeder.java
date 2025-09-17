package com.fpl.fplproject.Seeder;

import com.fpl.fplproject.model.Club;
import com.fpl.fplproject.model.Player;
import com.fpl.fplproject.PlayerRepo.ClubRepo;
import com.fpl.fplproject.PlayerRepo.PlayerRepo;
import com.fpl.fplproject.Service.FplApiService;
import com.fpl.fplproject.dto.FplApiResponseDTO;
import com.fpl.fplproject.dto.FplPlayerDTO;
import com.fpl.fplproject.dto.FplTeamDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PlayerRepo playerRepo;
    private final ClubRepo clubRepo;
    private final FplApiService fplApiService;

    @Autowired
    public DataSeeder(PlayerRepo playerRepo, ClubRepo clubRepo, FplApiService fplApiService) {
        this.playerRepo = playerRepo;
        this.clubRepo = clubRepo;
        this.fplApiService = fplApiService;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (clubRepo.count() > 0 || playerRepo.count() > 0) {
            System.out.println("Database already contains data. Skipping seeding.");
            return;
        }

        System.out.println("Database is empty. Seeding data from LIVE FPL API...");

        FplApiResponseDTO bootstrapData = fplApiService.fetchBootstrapData();
        if (bootstrapData == null || bootstrapData.getTeams() == null || bootstrapData.getPlayers() == null) {
            System.out.println("Failed to fetch complete FPL data. Aborting seed.");
            return;
        }

        Map<Integer, FplTeamDTO> idToTeam = bootstrapData.getTeams().stream()
                .collect(Collectors.toMap(FplTeamDTO::getId, t -> t));
        List<Club> clubsToSave = new ArrayList<>();
        for (FplTeamDTO teamDto : bootstrapData.getTeams()) {
            Club club = new Club(teamDto.getName(), 0, 0, 0, 0, 0, 0);
            clubsToSave.add(club);
        }
        List<Club> savedClubs = clubRepo.saveAll(clubsToSave);

        Map<Integer, Club> idToClub = new HashMap<>();
        for (FplTeamDTO teamDto : bootstrapData.getTeams()) {
            for (Club club : savedClubs) {
                if (club.getName().equals(teamDto.getName())) {
                    idToClub.put(teamDto.getId(), club);
                    break;
                }
            }
        }

        List<Player> playersToSave = new ArrayList<>();
        for (FplPlayerDTO playerDto : bootstrapData.getPlayers()) {
            Player player = new Player();
            player.setName(playerDto.getWebName());
            player.setNation("N/A");
            switch (playerDto.getElementType()) {
                case 1: player.setPosition("GK"); break;
                case 2: player.setPosition("DF"); break;
                case 3: player.setPosition("MF"); break;
                case 4: player.setPosition("FW"); break;
                default: player.setPosition("N/A"); break;
            }
            player.setAge(0);
            player.setMatches_played(0);
            player.setStarts(0);
            player.setMinutes_played(playerDto.getMinutes());
            player.setGoals(playerDto.getGoalsScored());
            player.setAssists(playerDto.getAssists());
            player.setYellow_cards(playerDto.getYellowCards());
            player.setRed_cards(playerDto.getRedCards());
            player.setCost(playerDto.getCost() / 10.0);
            player.setPhotoCode(playerDto.getPhoto());

            // Assign to club
            Club club = idToClub.get(playerDto.getTeamId());
            if (club != null) {
                player.setClub(club);
            }

            playersToSave.add(player);
        }
        playerRepo.saveAll(playersToSave);

        System.out.println("Seeding complete: " + savedClubs.size() + " clubs, " + playersToSave.size() + " players.");
    }
}







