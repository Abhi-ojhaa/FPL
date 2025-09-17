package com.fpl.fplproject.Service;

import com.fpl.fplproject.dto.EnrichedFixtureDTO;
import com.fpl.fplproject.dto.FplApiResponseDTO;
import com.fpl.fplproject.dto.FplFixtureDTO;
import com.fpl.fplproject.dto.FplTeamDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FixtureService {
    private final FplApiService fplApiService;

    @Autowired
    public FixtureService(FplApiService fplApiService){
        this.fplApiService=fplApiService;
    }

    public List<EnrichedFixtureDTO> getEnrichedFixtures(){
        FplApiResponseDTO bootstrapData = fplApiService.fetchBootstrapData();


        Map<Integer,String> teamIdToNameMap = bootstrapData.getTeams().stream()
                .collect(Collectors.toMap(FplTeamDTO::getId, FplTeamDTO::getName));
        System.out.println("DEBUG: Team lookup map created with " + teamIdToNameMap.size() + " entries.");

        List<EnrichedFixtureDTO> enrichedFixtures = new ArrayList<>();

        int debugCounter = 0;

        for(FplFixtureDTO rawFixture: bootstrapData.getFixtures()){

            if (debugCounter < 5) {
                System.out.println("--- Processing Fixture ---");
                System.out.println("DEBUG: Raw Home Team ID: " + rawFixture.getHomeTeamId());
                System.out.println("DEBUG: Raw Away Team ID: " + rawFixture.getAwayTeamId());
            }

            String homeTeamName = teamIdToNameMap.get(rawFixture.getHomeTeamId());
            String awayTeamName = teamIdToNameMap.get(rawFixture.getAwayTeamId());

            if (debugCounter < 5) {
                System.out.println("DEBUG: Looked up Home Team Name: " + homeTeamName);
                System.out.println("DEBUG: Looked up Away Team Name: " + awayTeamName);
            }
            debugCounter++;

            EnrichedFixtureDTO enrichedFixture = new EnrichedFixtureDTO();
            enrichedFixture.setHomeTeamName(homeTeamName);
            enrichedFixture.setAwayTeamName(awayTeamName);

            // -------- Defensive kickoffTime fix starts here --------
            String rawKickoffTime = rawFixture.getKickoffTime();
            String sanitizedKickoffTime = (rawKickoffTime == null || rawKickoffTime.isEmpty()) ? "TBD" : rawKickoffTime;
            enrichedFixture.setKickoffTime(sanitizedKickoffTime);
            // -------- Defensive kickoffTime fix ends here ----------

            enrichedFixture.setHomeTeamScore(rawFixture.getHomeTeamScore());
            enrichedFixture.setAwayTeamScore(rawFixture.getAwayTeamScore());
            enrichedFixture.setVenue(homeTeamName);

            enrichedFixtures.add(enrichedFixture);
        }

        return enrichedFixtures;
    }
}
