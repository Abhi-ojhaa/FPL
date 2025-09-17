package com.fpl.fplproject.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpl.fplproject.dto.ClubStatsDTO;
import com.fpl.fplproject.dto.StandingsResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class FootballDataService {
    @Value("${football.data.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<ClubStatsDTO> fetchPremierLeagueStandings() {
        String url = "https://api.football-data.org/v4/competitions/PL/standings";
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        try {
            ObjectMapper mapper = new ObjectMapper();
            StandingsResponseDTO standingsResponse = mapper.readValue(response.getBody(), StandingsResponseDTO.class);
            if (standingsResponse != null && standingsResponse.getStandings() != null && !standingsResponse.getStandings().isEmpty()) {
                return standingsResponse.getStandings().get(0).getTable();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }
}
