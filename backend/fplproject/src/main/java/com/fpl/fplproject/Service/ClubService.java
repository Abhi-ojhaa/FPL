package com.fpl.fplproject.Service;

import com.fpl.fplproject.PlayerRepo.ClubRepo;
import com.fpl.fplproject.dto.ClubRosterDTO;
import com.fpl.fplproject.model.Club;
import com.fpl.fplproject.model.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClubService {

    private final ClubRepo clubRepo;

    @Autowired
    public ClubService(ClubRepo clubRepo) {
        this.clubRepo = clubRepo;
    }

    public List<Club> getAllClubs() {
        return clubRepo.findAll();
    }


    @Transactional(readOnly = true)
    public Club getClubById(Long clubId) {
        return clubRepo.findById(clubId)
                .orElseThrow(() -> new IllegalStateException("Club with id '" + clubId + "' not found."));
    }

    @Transactional(readOnly = true)
    public ClubRosterDTO getClubRosterById(Long clubId) {
        Club club = clubRepo.findById(clubId)
                .orElseThrow(() -> new IllegalStateException("Club with id '" + clubId + "' not found."));

        Map<String, List<Player>> rosterByPosition = club.getPlayers()
                .stream()
                .collect(Collectors.groupingBy(Player::getPosition));

        return new ClubRosterDTO(club.getName(), rosterByPosition);
    }
}

