package com.camino.camino_v1.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class AppConstants {

    @Value("${app.jwt.secret_key}")
    private String JWT_SECRET_KEY;

    @Value("${app.jwt.accesstoken.expiration.time}")
    private long JWT_ACCESSTOKEN_EXPIRATION_TIME;

    @Value("${app.jwt.refreshtoken.expiration.time}")
    private long JWT_REFRESHTOKEN_EXPIRATION_TIME;

    @Value("${app.jwt.accesscookie.expiration.time}")
    private int JWT_ACCESSCOOKIE_EXPIRATION_TIME;

    @Value("${app.jwt.refreshcookie.expiration.time}")
    private int JWT_REFRESHCOOKIE_EXPIRATION_TIME;

    @Value("${app.jwt.security.strength}")
    private int JWT_SECURITY_STRENGTH;


    @Value("${public.endpoints}")
    private String publicEndpoints;

    public String[] getPublicEndpoints() {
        return publicEndpoints.split(",");
    }

}
