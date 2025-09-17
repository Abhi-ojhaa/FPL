package com.fpl.fplproject.PlayerRepo;

import com.fpl.fplproject.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PlayerRepo extends JpaRepository<Player,Integer> {
    Optional<Player> findByName(String name);

}
