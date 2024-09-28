package com.camino.camino_v1.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.camino.camino_v1.model.RefreshToken;

@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
        
    Optional<RefreshToken> findByToken(String token);
}
