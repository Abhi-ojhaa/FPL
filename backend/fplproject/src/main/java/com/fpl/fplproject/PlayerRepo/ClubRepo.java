package com.fpl.fplproject.PlayerRepo;

import com.fpl.fplproject.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ClubRepo extends JpaRepository<Club,Long> {
    Optional<Club> findByName(String name);
}
