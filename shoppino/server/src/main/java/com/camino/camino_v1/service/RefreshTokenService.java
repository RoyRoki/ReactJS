package com.camino.camino_v1.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camino.camino_v1.model.RefreshToken;
import com.camino.camino_v1.repository.RefreshTokenRepository;
import com.camino.camino_v1.repository.UserRepository;
import com.camino.camino_v1.util.AppConstants;

@Service
public class RefreshTokenService {
    
    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AppConstants appConstants;

    Logger logger = LoggerFactory.getLogger(RefreshTokenService.class);

    public RefreshToken createRefreshToken(String username) {

        RefreshToken refreshToken = RefreshToken.builder()
            .username(username)
            .token(UUID.randomUUID().toString())
            .expiryDate(Instant.now().plusMillis(appConstants.getJWT_REFRESHTOKEN_EXPIRATION_TIME()))
            .build();

        logger.info("Createing a new RefreshToken {}", refreshToken.toString());
        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken varifyExpiration(String token) {
        RefreshToken refreshToken = FindTokenFromDataBase(token);

            if(refreshToken.getExpiryDate() == null) {
                logger.info("Attend varifyExpiration of refreshtoken , and the expiryData is Null {}", refreshToken.getToken());
                return null;
            }            

        if(refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            logger.error("Expiraed refreshToken Deleted {}", refreshToken.toString());
            return null;
        } 
        return refreshToken;
    }

    private RefreshToken FindTokenFromDataBase(String token) {
        Optional <RefreshToken> optionalToken = refreshTokenRepository.findByToken(token);

        if(!optionalToken.isPresent()) {
          return null;      
        }
        return optionalToken.get();
    }

    public RefreshToken reGenerate(RefreshToken refreshToken) {
        refreshTokenRepository.delete(refreshToken);
        return createRefreshToken(refreshToken.getUsername());
    }
}
