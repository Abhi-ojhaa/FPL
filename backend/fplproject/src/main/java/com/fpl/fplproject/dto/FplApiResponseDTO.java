package com.fpl.fplproject.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FplApiResponseDTO {
    @JsonProperty("elements")
    private List<FplPlayerDTO> players;
    @JsonProperty("teams")
    private List<FplTeamDTO> teams;
    @JsonProperty("events")
    private List<FplFixtureDTO> fixtures;

    public List<FplFixtureDTO> getFixtures() {
        return fixtures;
    }

    public void setFixtures(List<FplFixtureDTO> fixtures) {
        this.fixtures = fixtures;
    }

    public List<FplPlayerDTO> getPlayers() {
        return players;
    }

    public void setPlayers(List<FplPlayerDTO> players) {
        this.players = players;
    }

    public List<FplTeamDTO> getTeams() {
        return teams;
    }

    public void setTeams(List<FplTeamDTO> teams) {
        this.teams = teams;
    }
}
