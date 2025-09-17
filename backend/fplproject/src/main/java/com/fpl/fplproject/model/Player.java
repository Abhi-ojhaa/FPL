package com.fpl.fplproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "player_stats")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true, nullable = false)
    private String name;
    private String nation;
    private String position;
    private int age;
    private int matches_played;
    private int starts;
    private double minutes_played;
    private int goals;
    private int assists;
    private int yellow_cards;
    private int red_cards;
    private double cost;
    private String photoCode;

    public Player() {
    }

    public Player(String name, String nation, String position, int age, int matches_played, int starts, double minutes_played, int goals, int assists, int yellow_cards, int red_cards,int cost) {
        this.name = name;
        this.nation = nation;
        this.position = position;
        this.age = age;
        this.matches_played = matches_played;
        this.starts = starts;
        this.minutes_played = minutes_played;
        this.goals = goals;
        this.assists = assists;
        this.yellow_cards = yellow_cards;
        this.red_cards = red_cards;
        this.cost=cost;
    }
    @ManyToOne
    @JoinColumn(name = "club_id",nullable = true)
    @JsonIgnore
    private Club club;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getMatches_played() {
        return matches_played;
    }

    public void setMatches_played(int matches_played) {
        this.matches_played = matches_played;
    }

    public int getStarts() {
        return starts;
    }

    public void setStarts(int starts) {
        this.starts = starts;
    }

    public double getMinutes_played() {
        return minutes_played;
    }

    public void setMinutes_played(double minutes_played) {
        this.minutes_played = minutes_played;
    }

    public int getGoals() {
        return goals;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getYellow_cards() {
        return yellow_cards;
    }

    public void setYellow_cards(int yellow_cards) {
        this.yellow_cards = yellow_cards;
    }

    public int getRed_cards() {
        return red_cards;
    }

    public void setRed_cards(int red_cards) {
        this.red_cards = red_cards;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public String getPhotoCode() {
        return photoCode;
    }

    public void setPhotoCode(String photoCode) {
        this.photoCode = photoCode;
    }
}
