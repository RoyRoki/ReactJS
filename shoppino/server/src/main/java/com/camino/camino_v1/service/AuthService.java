package com.camino.camino_v1.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.camino.camino_v1.config.JwtFilter;
import com.camino.camino_v1.dto.AuthRegisterDTO;
import com.camino.camino_v1.model.User;
import com.camino.camino_v1.repository.UserRepository;
import com.camino.camino_v1.util.AppConstants;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthService {
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JWTService jwtService;

    @Autowired
    JwtFilter jwtFilter;

    private BCryptPasswordEncoder encoder;

    Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthService (AppConstants appConstants) {
       this.encoder = new BCryptPasswordEncoder(appConstants.getJWT_SECURITY_STRENGTH());
    }

    public long verify(String email, String password) {
        Authentication authentication = 
                    authManager.authenticate
                    (new UsernamePasswordAuthenticationToken(email, password));
            
            if(authentication.isAuthenticated())
                    return userRepository.findUserByEmail(email).getId();
            
            throw new RuntimeException("Authentication failed");    
    }
    
    public boolean save(HttpServletResponse response, AuthRegisterDTO authRegister) {
        boolean isExists = userRepository.existsByEmail(authRegister.getEmail());
        if(isExists) return false;
        else {
            User newUser = User.builder()
                    .username(authRegister.getUsername())
                    .email(authRegister.getEmail())
                    .build();

          newUser.setPassword(encoder.encode(authRegister.getPassword()));
          User savedUser = userRepository.save(newUser);
          jwtFilter.setNewTokensReturnJWT(response, savedUser.getId());
          return true;  
        }
    }

    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public void doLogout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookies[] = request.getCookies();
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                Cookie rmCookie = new Cookie(cookie.getName(), null);
                rmCookie.setMaxAge(0);
                rmCookie.setPath("/");
                rmCookie.setHttpOnly(true);

                response.addCookie(rmCookie);
            }
        }

        request.getSession().invalidate();
        logger.info("User logged out successfully and all cookies cleared");
    }
}
