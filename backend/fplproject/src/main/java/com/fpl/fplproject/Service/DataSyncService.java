package com.fpl.fplproject.Service;

import com.fpl.fplproject.PlayerRepo.PlayerRepo;
import com.fpl.fplproject.model.Player;
import com.fpl.fplproject.dto.FplApiResponseDTO;
import com.fpl.fplproject.dto.FplPlayerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Component
public class DataSyncService {

    private final FplApiService fplApiService;
    private final PlayerRepo playerRepo;

    @Autowired
    public DataSyncService(FplApiService fplApiService, PlayerRepo playerRepo) {
        this.fplApiService = fplApiService;
        this.playerRepo = playerRepo;
    }

    @Transactional

    public void syncPlayerData() {
        System.out.println("Starting FPL API data synchronization...");


        FplApiResponseDTO bootstrapData = fplApiService.fetchBootstrapData();
        if (bootstrapData == null || bootstrapData.getPlayers() == null) {
            System.out.println("Failed to fetch data from FPL API. Aborting sync.");
            return;
        }

        List<FplPlayerDTO> playersFromApi = bootstrapData.getPlayers();
        System.out.println("Found " + playersFromApi.size() + " players in FPL API data. Processing...");

        for (FplPlayerDTO playerDto : playersFromApi) {
            Optional<Player> existingPlayerOpt = playerRepo.findByName(playerDto.getWebName());

            if (existingPlayerOpt.isEmpty()) {
                // New player, create and save
                System.out.println("    -> Adding new player: " + playerDto.getWebName());
                Player newPlayer = new Player();
                newPlayer.setName(playerDto.getWebName());


                newPlayer.setNation("N/A");


                switch (playerDto.getElementType()) {
                    case 1: newPlayer.setPosition("GK"); break;
                    case 2: newPlayer.setPosition("DF"); break;
                    case 3: newPlayer.setPosition("MF"); break;
                    case 4: newPlayer.setPosition("FW"); break;
                    default: newPlayer.setPosition("N/A"); break;
                }


                newPlayer.setAge(0);
                newPlayer.setMatches_played(0);
                newPlayer.setStarts(0);

                newPlayer.setMinutes_played(playerDto.getMinutes());
                newPlayer.setGoals(playerDto.getGoalsScored());
                newPlayer.setAssists(playerDto.getAssists());


                newPlayer.setYellow_cards(playerDto.getYellowCards());
                newPlayer.setRed_cards(playerDto.getRedCards());


                newPlayer.setCost(playerDto.getCost() / 10.0);
                newPlayer.setPhotoCode(playerDto.getPhoto());

                playerRepo.save(newPlayer);
            }
        }
        System.out.println("FPL data synchronization finished successfully!");
    }
}


