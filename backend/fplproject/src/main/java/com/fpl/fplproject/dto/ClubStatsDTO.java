package com.fpl.fplproject.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ClubStatsDTO {
    @JsonProperty("team")
    private TeamDTO team;
    @JsonProperty("won")
    private int wins;
    @JsonProperty("draw")
    private int draws;
    @JsonProperty("lost")
    private int losses;
    @JsonProperty("goalsFor")
    private int goalsFor;
    @JsonProperty("goalsAgainst")
    private int goalsAgainst;
    @JsonProperty("points")
    private int points;

    // Inner class for team info
    public static class TeamDTO {
        @JsonProperty("id")
        private long id;
        @JsonProperty("name")
        private String name;

        public long getId() { return id; }
        public void setId(long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public TeamDTO getTeam() { return team; }
    public void setTeam(TeamDTO team) { this.team = team; }
    public int getWins() { return wins; }
    public void setWins(int wins) { this.wins = wins; }
    public int getDraws() { return draws; }
    public void setDraws(int draws) { this.draws = draws; }
    public int getLosses() { return losses; }
    public void setLosses(int losses) { this.losses = losses; }
    public int getGoalsFor() { return goalsFor; }
    public void setGoalsFor(int goalsFor) { this.goalsFor = goalsFor; }
    public int getGoalsAgainst() { return goalsAgainst; }
    public void setGoalsAgainst(int goalsAgainst) { this.goalsAgainst = goalsAgainst; }
    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }
}
