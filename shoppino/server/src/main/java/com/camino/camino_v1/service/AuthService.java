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

    public String verify(User user) {
        Authentication authentication = 
                    authManager.authenticate
                    (new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            
            if(authentication.isAuthenticated())
                    return jwtService.generateToken(user.getUsername());
            
            return "Fail";
        
    }
    
    public boolean save(HttpServletResponse response, User newUser) {
        boolean isExists = userRepository.existsByEmail(newUser.getEmail());
        if(isExists) return false;
        else {
          newUser.setPassword(encoder.encode(newUser.getPassword()));
          newUser.setRole(User.Role.USER);
          userRepository.save(newUser);
          jwtFilter.setNewTokensReturnJWT(response, newUser.getUsername());
          return true;  
        }
    }

    public Object getAllUsers() {
        return userRepository.findAll();
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
