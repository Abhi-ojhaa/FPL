package com.fpl.fplproject.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FplPlayerDTO {
    @JsonProperty("web_name")
    private String webName;
    @JsonProperty("goals_scored")
    private int goalsScored;
    @JsonProperty("assists")
    private int assists;
    @JsonProperty("total_points")
    private int totalPoints;
    @JsonProperty("minutes")
    private int minutes;
    @JsonProperty("team")
    private int teamId;
    @JsonProperty("element_type")
    private int elementType;
    @JsonProperty("now_cost")
    private int cost;
    @JsonProperty("photo")
    private String photo;
    @JsonProperty("yellow_cards")
    private int yellowCards;
    @JsonProperty("red_cards")
    private int redCards;



    public int getYellowCards() {
        return yellowCards;
    }

    public void setYellowCards(int yellowCards) {
        this.yellowCards = yellowCards;
    }

    public int getRedCards() {
        return redCards;
    }

    public void setRedCards(int redCards) {
        this.redCards = redCards;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getWebName() {
        return webName;
    }

    public void setWebName(String webName) {
        this.webName = webName;
    }

    public int getGoalsScored() {
        return goalsScored;
    }

    public void setGoalsScored(int goalScored) {
        this.goalsScored = goalScored;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }
    public int getElementType() {
        return elementType;
    }

    public void setElementType(int elementType) {
        this.elementType = elementType;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    @JsonIgnore
    public String getPhotoUrl() {

        return "https://resources.premierleague.com/premierleague/photos/players/110x140/p" + this.photo;
    }

    @JsonProperty("photo_url")
    public String getPhotoUrlJson() {
        return getPhotoUrl();
    }
}
