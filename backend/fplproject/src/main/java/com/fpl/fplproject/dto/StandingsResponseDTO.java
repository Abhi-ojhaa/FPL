package com.fpl.fplproject.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class StandingsResponseDTO {
    @JsonProperty("standings")
    private List<StandingDTO> standings;

    public List<StandingDTO> getStandings() { return standings; }
    public void setStandings(List<StandingDTO> standings) { this.standings = standings; }

    public static class StandingDTO {
        @JsonProperty("table")
        private List<ClubStatsDTO> table;

        public List<ClubStatsDTO> getTable() { return table; }
        public void setTable(List<ClubStatsDTO> table) { this.table = table; }
    }
}