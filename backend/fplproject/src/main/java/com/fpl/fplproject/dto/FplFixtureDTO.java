package com.fpl.fplproject.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FplFixtureDTO {

    @JsonProperty("finished")
    private boolean finished;

    // The date and time of the match.
    @JsonProperty("kickoff_time")
    private String kickoffTime;

    // The ID of the home team.
    @JsonProperty("team_h")
    private int homeTeamId;

    // The ID of the away team.
    @JsonProperty("team_a")
    private int awayTeamId;

    // The score for the home team (will be null if the match hasn't been played).
    @JsonProperty("team_h_score")
    private Integer homeTeamScore;

    // The score for the away team.
    @JsonProperty("team_a_score")
    private Integer awayTeamScore;


    // Getters and Setters for all fields
    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public String getKickoffTime() {
        return kickoffTime;
    }

    public void setKickoffTime(String kickoffTime) {
        this.kickoffTime = kickoffTime;
    }

    public int getHomeTeamId() {
        return homeTeamId;
    }

    public void setHomeTeamId(int homeTeamId) {
        this.homeTeamId = homeTeamId;
    }

    public int getAwayTeamId() {
        return awayTeamId;
    }

    public void setAwayTeamId(int awayTeamId) {
        this.awayTeamId = awayTeamId;
    }

    public Integer getHomeTeamScore() {
        return homeTeamScore;
    }

    public void setHomeTeamScore(Integer homeTeamScore) {
        this.homeTeamScore = homeTeamScore;
    }

    public Integer getAwayTeamScore() {
        return awayTeamScore;
    }

    public void setAwayTeamScore(Integer awayTeamScore) {
        this.awayTeamScore = awayTeamScore;
    }
}
