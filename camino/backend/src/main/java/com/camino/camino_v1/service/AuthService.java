package com.camino.camino_v1.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.camino.camino_v1.model.User;
import com.camino.camino_v1.repository.UserRepository;

@Service
public class AuthService {
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String verify(User user) {
        Authentication authentication = 
                    authManager.authenticate
                    (new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            
            if(authentication.isAuthenticated())
                    return jwtService.generateToken(user.getUsername());
            
            return "Fail";
        
    }
    
    public User save(User newUser) {
        boolean isExists = userRepository.existsByEmail(newUser.getEmail());
        if(isExists) return null;
        else {
          newUser.setPassword(encoder.encode(newUser.getPassword()));
          newUser.setRole(User.Role.USER);
          userRepository.save(newUser);
          return newUser;  
        }
    }

    public Object getAllUsers() {
        return userRepository.findAll();
    }
}
