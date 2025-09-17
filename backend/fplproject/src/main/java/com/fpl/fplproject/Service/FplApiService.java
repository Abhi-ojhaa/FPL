package com.fpl.fplproject.Service;

import com.fpl.fplproject.dto.FplApiResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class FplApiService {
    private final RestTemplate restTemplate;
    private final String fplApiUr1= "https://fantasy.premierleague.com/api/bootstrap-static/";
    @Autowired
    public FplApiService(RestTemplate restTemplate){
        this.restTemplate=restTemplate;
    }
    public FplApiResponseDTO fetchBootstrapData(){
        System.out.print("progess");
        HttpHeaders headers=new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
        HttpEntity<String> entity=new HttpEntity<>("parameters",headers);
        ResponseEntity<FplApiResponseDTO> response=restTemplate.exchange(
                fplApiUr1,
                HttpMethod.GET,
                entity,
                FplApiResponseDTO.class
        );
        System.out.println("Successfully done it ");
        return response.getBody();
    }

}
