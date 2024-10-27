package com.camino.camino_v1.controller;

import org.springframework.web.bind.annotation.RestController;

import com.camino.camino_v1.config.JwtFilter;
import com.camino.camino_v1.dto.AuthRegisterDTO;
import com.camino.camino_v1.dto.AuthRequestDTO;
import com.camino.camino_v1.dto.AuthResponseDTO;
import com.camino.camino_v1.model.RefreshToken;
import com.camino.camino_v1.model.User;
import com.camino.camino_v1.service.AuthService;
import com.camino.camino_v1.service.JWTService;
import com.camino.camino_v1.service.RefreshTokenService;
import com.camino.camino_v1.util.AppConstants;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController("authcontroller")
@RequestMapping("/auth")
public class AuthController {

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private JWTService jwtService;

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    AuthService authService;

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    AppConstants appConstants;
    
    @GetMapping("/api")
    public ResponseEntity<String> getTest() {
        return new ResponseEntity<>("Successful BackEnd Connection", HttpStatus.OK);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<String> getSignUp(@RequestBody AuthRegisterDTO authRegister, HttpServletResponse response) {   
        boolean ok = authService.save(response, authRegister);
        logger.info("New User Added {}",response.toString());   
        return new ResponseEntity<>("user signup successfully", ok?HttpStatus.OK: HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> getLogIn(@RequestBody AuthRequestDTO requestDTO, HttpServletResponse response) {

        try {
            long user_id = authService.verify(requestDTO.getEmail(), requestDTO.getPassword());
        
        
        String jwtToken = jwtService.generateToken(requestDTO.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user_id);

        Cookie jwtcookie = new Cookie("Authorization", jwtToken );
        jwtcookie.setPath("/");
        jwtcookie.setMaxAge(appConstants.getJWT_ACCESSCOOKIE_EXPIRATION_TIME());
        //jwtcookie.setHttpOnly(true);// Prevent JavaScript
        //jwtcookie.setSecure(true);// Only send cookie over HTTPS

        Cookie refreshTokenCookie = new Cookie("RefreshToken", refreshToken.getToken());
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(appConstants.getJWT_REFRESHCOOKIE_EXPIRATION_TIME());

        response.addCookie(jwtcookie);
        response.addCookie(refreshTokenCookie);

        
        AuthResponseDTO ResponseDTO = AuthResponseDTO.builder()
                            .accessToken(jwtToken)
                            .refreshToken(refreshToken.getToken())
                            .build();

        return ResponseEntity.ok(ResponseDTO);

        } catch (Exception e) {
            AuthResponseDTO errorDTO = AuthResponseDTO.builder()
                                    .accessToken(null)
                                    .refreshToken(null)
                                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorDTO);
        }
        
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserDetails(HttpServletRequest request) {
        logger.info("hit /user");
      User user = null;
      String token = jwtFilter.getTokenFromCookie("Authorization", request);

      if(token != null) {
        String email = jwtService.extractEmail(token);
        if(email != null) {
             user = authService.getUserByEmail(email);
            if(user != null) {
                user.setPassword(null);
                return ResponseEntity.status(HttpStatus.OK).body(user);
            }
        }
      }
    logger.info("/user No user found");
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(user);
      
    }

    // @PostMapping("/refresh")
    // public JwtResponseDTO refreshToken(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
    //     return refreshTokenService.findByToken(refreshTokenRequestDTO.getToken())
    //                 .map(refreshTokenService::varifyExpiration)
    //                 .map(RefreshToken::getUsername)
    //                 .map(username -> {
    //                     String accessToken = jwtService.generateToken(username);
    //                     return JwtResponseDTO.builder()
    //                             .accessToken(accessToken)
    //                             .token(refreshTokenRequestDTO.getToken())
    //                             .build();
    //                 }).orElseThrow(() -> new RuntimeException("Refresh Token is not in DB..!!"));
        
    // }
    
}
