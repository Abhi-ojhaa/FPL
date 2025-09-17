package com.fpl.fplproject.Service;

import com.fpl.fplproject.PlayerRepo.ClubRepo;
import com.fpl.fplproject.dto.ClubStatsDTO;
import com.fpl.fplproject.model.Club;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClubSyncService {

    private final ClubRepo clubRepo;
    private final FootballDataService footballDataService;

    @Autowired
    public ClubSyncService(ClubRepo clubRepo, FootballDataService footballDataService) {
        this.clubRepo = clubRepo;
        this.footballDataService = footballDataService;
    }

    /**
     * Updates stats for EXISTING clubs only, matching by exact name.
     * Never creates new clubs. Logs if no match is found.
     */
    @Transactional
    public void syncClubsWithStats() {
        List<ClubStatsDTO> clubStats = footballDataService.fetchPremierLeagueStandings();
        for (ClubStatsDTO stats : clubStats) {
            Optional<Club> clubOpt = clubRepo.findByName(stats.getTeam().getName());
            if (clubOpt.isPresent()) {
                Club club = clubOpt.get();
                club.setWins(stats.getWins());
                club.setDraws(stats.getDraws());
                club.setLosses(stats.getLosses());
                club.setGoals_for(stats.getGoalsFor());
                club.setGoals_against(stats.getGoalsAgainst());
                club.setPoints(stats.getPoints());
                clubRepo.save(club);
            } else {
                System.out.println("No matching club in DB for: " + stats.getTeam().getName());
            }
        }
    }
}
