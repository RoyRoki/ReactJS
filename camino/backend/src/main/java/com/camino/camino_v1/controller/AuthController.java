package com.camino.camino_v1.controller;

import org.springframework.web.bind.annotation.RestController;

import com.camino.camino_v1.dto.AuthResponseDTO;
import com.camino.camino_v1.dto.JwtResponseDTO;
import com.camino.camino_v1.dto.RefreshTokenRequestDTO;
import com.camino.camino_v1.model.RefreshToken;
import com.camino.camino_v1.model.User;
import com.camino.camino_v1.service.AuthService;
import com.camino.camino_v1.service.JWTService;
import com.camino.camino_v1.service.RefreshTokenService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController("authcontroller")
public class AuthController {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthService authService;

    @Autowired
    RefreshTokenService refreshTokenService;
    
    @GetMapping("/")
    public ResponseEntity<String> getTest() {
        return ResponseEntity.ok("{\"message\":\"Successful BackEnd Connection\"}");
    }

    @GetMapping("/users")
    public ResponseEntity<Object> getUsers() {
        System.out.println("get users called");
        return ResponseEntity.ok().body(authService.getAllUsers());
    }
    
    @PostMapping("/signup")
    public ResponseEntity<String> getSignUp(@RequestBody User newUser) {   
        User response = authService.save(newUser);   
        return ResponseEntity.ok("{\"message\":\"Successfuly User Added\"}");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> getLogIn(@RequestBody User user, HttpServletResponse response) {

        String jwtToken = authService.verify(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getUsername());

        Cookie jwtcookie = new Cookie("Authorization", jwtToken );
        jwtcookie.setPath("/");
        jwtcookie.setMaxAge(60*60*15);
        //jwtcookie.setHttpOnly(true);// Prevent JavaScript
        //jwtcookie.setSecure(true);// Only send cookie over HTTPS

        Cookie refreshTokenCookie = new Cookie("RefreshToken", refreshToken.getToken());
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(60*60*15);

        response.addCookie(jwtcookie);
        response.addCookie(refreshTokenCookie);

        
        AuthResponseDTO ResponseDTO = AuthResponseDTO.builder()
                            .accessToken(jwtToken)
                            .refreshToken(refreshToken.getToken())
                            .build();

        
        return ResponseEntity.ok(ResponseDTO);
    }


    @PostMapping("/refresh")
    public JwtResponseDTO refreshToken(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
        return refreshTokenService.findByToken(refreshTokenRequestDTO.getToken())
                    .map(refreshTokenService::varifyExpiration)
                    .map(RefreshToken::getUsername)
                    .map(username -> {
                        String accessToken = jwtService.generateToken(username);
                        return JwtResponseDTO.builder()
                                .accessToken(accessToken)
                                .token(refreshTokenRequestDTO.getToken())
                                .build();
                    }).orElseThrow(() -> new RuntimeException("Refresh Token is not in DB..!!"));
        
    }
    
}
