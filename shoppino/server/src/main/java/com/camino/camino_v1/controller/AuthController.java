package com.camino.camino_v1.controller;

import org.springframework.web.bind.annotation.RestController;

import com.camino.camino_v1.dto.AuthResponseDTO;
import com.camino.camino_v1.model.RefreshToken;
import com.camino.camino_v1.model.User;
import com.camino.camino_v1.service.AuthService;
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

    // @Autowired
    // private JWTService jwtService;

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

    @GetMapping("/users")
    public ResponseEntity<Object> getUsers() {
        
        logger.info("/users hit");
        
        return ResponseEntity.ok().body(authService.getAllUsers());
    }
    
    @PostMapping("/signup")
    public ResponseEntity<String> getSignUp(@RequestBody User newUser, HttpServletResponse response) {   
        boolean ok = authService.save(response, newUser);
        logger.info("New User Added {}",response.toString());   
        return new ResponseEntity<>("user signup successfully", ok?HttpStatus.OK: HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> getLogIn(@RequestBody User user, HttpServletResponse response) {

        String jwtToken = authService.verify(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getUsername());

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
    }

    @GetMapping("/userout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
      authService.doLogout(request, response);
      return ResponseEntity.ok("Logout successful");
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
