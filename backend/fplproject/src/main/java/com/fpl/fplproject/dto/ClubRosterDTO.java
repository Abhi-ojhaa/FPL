package com.fpl.fplproject.dto;

import com.fpl.fplproject.model.Player;
import java.util.List;
import java.util.Map;

public class ClubRosterDTO {
    private String clubName;
    private Map<String, List<Player>> roster;

    public ClubRosterDTO() { }

    public ClubRosterDTO(String clubName, Map<String,List<Player>> roster){
        this.clubName=clubName;
        this.roster=roster;
    }

    public String getClubName() { return clubName; }
    public void setClubName(String clubName) { this.clubName = clubName; }

    public Map<String, List<Player>> getRoster() { return roster; }
    public void setRoster(Map<String, List<Player>> roster) { this.roster = roster; }
}
