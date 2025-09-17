package com.fpl.fplproject.PlayerControl;

import com.fpl.fplproject.Service.FixtureService;
import com.fpl.fplproject.dto.EnrichedFixtureDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fixtures")
@CrossOrigin(origins = "http://localhost:5173")
public class FixtureController {

    private final FixtureService fixtureService;

    @Autowired
    public FixtureController(FixtureService fixtureService) {
        this.fixtureService = fixtureService;
    }
    @GetMapping
    public List<EnrichedFixtureDTO> getFullFixtureList() {
        return fixtureService.getEnrichedFixtures();
    }
}
