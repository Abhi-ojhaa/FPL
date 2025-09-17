package com.fpl.fplproject.Service;

import com.fpl.fplproject.dto.FplApiResponseDTO;
import com.fpl.fplproject.dto.FplPlayerDTO;
import com.fpl.fplproject.dto.PlayerComparisonDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerComparisonService {
    private final FplApiService fplApiService;
    @Autowired
    public PlayerComparisonService(FplApiService fplApiService) {
        this.fplApiService = fplApiService;
    }


    public PlayerComparisonDTO comparePlayers(String playerNameA, String playerNameB) {
        FplApiResponseDTO bootstrapData = fplApiService.fetchBootstrapData();
        List<FplPlayerDTO> allPlayers = bootstrapData.getPlayers();
        FplPlayerDTO playerA = findPlayerByName(allPlayers, playerNameA);
        FplPlayerDTO playerB = findPlayerByName(allPlayers, playerNameB);
        return new PlayerComparisonDTO(playerA, playerB);
    }
    private FplPlayerDTO findPlayerByName(List<FplPlayerDTO> players, String name) {

        return players.stream()
                .filter(player -> name.equalsIgnoreCase(player.getWebName()))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Player with name '" + name + "' not found in FPL data."));
    }
}
