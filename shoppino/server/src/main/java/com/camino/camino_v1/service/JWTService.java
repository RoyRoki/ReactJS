package com.camino.camino_v1.service;

// import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

// import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.camino.camino_v1.util.AppConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    @Autowired
    AppConstants appConstants;
    
        Logger logger = LoggerFactory.getLogger(JWTService.class);
    
        // public JWTService() {
        //     try{
        //         KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
        //         SecretKey SK = keyGen.generateKey();
        //         SECRET_KEY = Base64.getEncoder().encodeToString(SK.getEncoded());
        //     } catch (Exception e) {
        //         throw new RuntimeException(e);
        //     }
        // }
    
        public String generateToken(String email) {
                
            Map<String, Object> claims = new HashMap<>();
            
            logger.info("Jwt token created for {}", email);
    
            return Jwts.builder()
                        .claims()
                        .add(claims)
                        .subject(email)
                        .issuedAt(new Date(System.currentTimeMillis()))
                        .expiration(new Date(System.currentTimeMillis() + appConstants.getJWT_ACCESSTOKEN_EXPIRATION_TIME()))
                        .and()
                        .signWith(getKey())
                        .compact();
        }
    
        private SecretKey getKey() {
            byte[] keyBytes = Decoders.BASE64.decode(appConstants.getJWT_SECRET_KEY());
            return Keys.hmacShaKeyFor(keyBytes);
        }
    
        public String extractEmail(String token) {
            return extractClaim(token, Claims::getSubject);
        }
        
        private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
            final Claims claims = extractAllClaims(token);
            return claimResolver.apply(claims);
        }
    
        private Claims extractAllClaims(String token) {
            return Jwts.parser()
                       .verifyWith(getKey())
                       .build()
                       .parseSignedClaims(token)
                       .getPayload();
        }
    
    
        public boolean validateToken(String token, UserDetails userdetails) {
            final String email = extractEmail(token);
            return (email.equals(userdetails.getUsername()) && !isTokenExpired(token));
        }
    
        public boolean isTokenExpired(String token) {
            return extractExpiration(token).before(new Date());
        }
    
        public Date extractExpiration(String token) {
            return extractClaim(token, Claims::getExpiration);
        }
    
        public String generateTokenFromClaims(Claims claims, String email) {
                        return Jwts.builder()
                        .claims()
                        .add(claims)
                        .subject(email)
                        .issuedAt(new Date(System.currentTimeMillis()))
                        .expiration(new Date(System.currentTimeMillis() + appConstants.getJWT_ACCESSTOKEN_EXPIRATION_TIME()))
                        .and()
                        .signWith(getKey())
                        .compact();

    }
    
}
