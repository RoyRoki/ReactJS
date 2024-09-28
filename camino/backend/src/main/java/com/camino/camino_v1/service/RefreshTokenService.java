package com.camino.camino_v1.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camino.camino_v1.model.RefreshToken;
import com.camino.camino_v1.repository.RefreshTokenRepository;
import com.camino.camino_v1.repository.UserRepository;

@Service
public class RefreshTokenService {
    
    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    @Autowired
    UserRepository userRepository;

    public RefreshToken createRefreshToken(String username) {

        RefreshToken refreshToken = RefreshToken.builder()
            .username(username)
            .token(UUID.randomUUID().toString())
            .expiryDate(Instant.now().plusMillis(600000))
            .build();
        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken varifyExpiration(RefreshToken token) {
        if(token.getExpiryDate().compareTo(Instant.now())<0) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException(token.getToken()+ "Refresh Token is Expired / make a new login");
        } 
        return token;
    }
}
