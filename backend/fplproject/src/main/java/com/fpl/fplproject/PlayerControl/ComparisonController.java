package com.fpl.fplproject.PlayerControl;

import com.fpl.fplproject.model.Player;
import com.fpl.fplproject.Service.PlayerComparisonService;
import com.fpl.fplproject.Service.PlayerService;
import com.fpl.fplproject.dto.PlayerComparisonDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/player")
@CrossOrigin(origins = "http://localhost:5173")
public class ComparisonController {

    private final PlayerService playerService;
    private final PlayerComparisonService playerComparisonService;

    // --- THIS IS THE FIX ---
    // The constructor name must match the class name.
    @Autowired
    public ComparisonController(PlayerService playerService, PlayerComparisonService playerComparisonService) {
        this.playerService = playerService;
        this.playerComparisonService = playerComparisonService;
    }


    @GetMapping
    public List<Player> getPlayers() {
        return playerService.getPlayers();
    }

    // Gets a single player from your database by name
    @GetMapping("/name/{playerName}")
    public Player getPlayerByName(@PathVariable String playerName) {
        return playerService.getPlayerByName(playerName);
    }

    @GetMapping("/compare")
    public PlayerComparisonDTO compareTwoPlayers(
            @RequestParam("playerA") String playerA,
            @RequestParam("playerB") String playerB) {
        return playerComparisonService.comparePlayers(playerA, playerB);
    }
    @GetMapping("/suggestions")
    public List<Player> getPlayerSuggestions(
            @RequestParam("position") String position,
            @RequestParam("budget") double budget
    ){
        return playerService.getPlayerSuggestions(position, budget);
    }
}
