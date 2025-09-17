package com.fpl.fplproject.PlayerControl;

import com.fpl.fplproject.dto.ClubRosterDTO;
import com.fpl.fplproject.Service.ClubService;
import com.fpl.fplproject.model.Club;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for club-related endpoints.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/clubs")
public class ClubControl {

    @Autowired
    private ClubService clubService;

    /**
     * Get all clubs with their stats.
     * @return List of Club entities.
     */
    @GetMapping
    public List<Club> getAllClubs() {
        return clubService.getAllClubs();
    }

    /**
     * Get a single club's info (not the roster).
     * @param clubId Club ID.
     * @return Club entity.
     */
    @GetMapping("/info/{clubId}")
    public Club getClubInfo(@PathVariable Long clubId) {
        return clubService.getClubById(clubId);
    }

    /**
     * Get roster and details for a club.
     * @param clubId Club ID.
     * @return ClubRosterDTO with players and details.
     */
    @GetMapping("/{clubId}")
    public ClubRosterDTO getClubRoster(@PathVariable Long clubId) {
        return clubService.getClubRosterById(clubId);
    }
}
