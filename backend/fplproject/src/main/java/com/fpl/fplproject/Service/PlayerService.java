package com.fpl.fplproject.Service;

import com.fpl.fplproject.model.Player;
import com.fpl.fplproject.PlayerRepo.PlayerRepo; // Make sure this import is correct
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    private final PlayerRepo playerRepo;

    @Autowired
    public PlayerService(PlayerRepo playerRepo) {
        this.playerRepo = playerRepo;
    }

    public List<Player> getPlayers() {
        return playerRepo.findAll();
    }

    public Player getPlayerByName(String name) {
        return playerRepo.findByName(name)
                .orElseThrow(() -> new IllegalStateException("Player with name " + name + " does not exist."));
    }

    public List<Player> getPlayerSuggestions(String position, double budget) {

        List<Player> allPlayers = playerRepo.findAll();
        List<Player> suggestions = allPlayers.stream()
                .filter(player -> position.equalsIgnoreCase(player.getPosition()))
                .filter(player -> player.getCost() <= budget)
                .sorted(Comparator.comparingDouble((Player player) -> {
                    return (player.getGoals() * 5.0) + (player.getAssists() * 3.0);
                }).reversed())
                .limit(5)
                .collect(Collectors.toList());

        return suggestions;
    }
}

