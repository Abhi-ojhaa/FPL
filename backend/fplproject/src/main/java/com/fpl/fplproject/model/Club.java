package com.fpl.fplproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "clubs")
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private int wins;
    private int draws;
    private int losses;
    private int goals_for;
    private int goals_against;
    private int points;

    @OneToMany(mappedBy = "club")
    @JsonIgnore
    private Set<Player> players=new HashSet<>();

    public Club() {}

    // A constructor for easily creating new clubs
    public Club(String name, int wins, int draws, int losses, int goals_for, int goals_against, int points) {
        this.name = name;
        this.wins = wins;
        this.draws = draws;
        this.losses = losses;
        this.goals_for = goals_for;
        this.goals_against = goals_against;
        this.points = points;
    }
    public void addPlayer(Player player) {
        this.players.add(player); // Add the player to the club's set
        player.setClub(this);     // Set this club on the player
    }

    // --- Getters and Setters for all fields ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getDraws() {
        return draws;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }

    public int getLosses() {
        return losses;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }

    public int getGoals_for() {
        return goals_for;
    }

    public void setGoals_for(int goals_for) {
        this.goals_for = goals_for;
    }

    public int getGoals_against() {
        return goals_against;
    }

    public void setGoals_against(int goals_against) {
        this.goals_against = goals_against;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public Set<Player> getPlayers() {
        return players;
    }

    public void setPlayers(Set<Player> players) {
        this.players = players;
    }
}

