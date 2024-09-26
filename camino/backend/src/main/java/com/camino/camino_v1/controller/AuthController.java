package com.camino.camino_v1.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camino.camino_v1.model.User;
import com.camino.camino_v1.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController("authcontroller")
@RequestMapping("")
public class AuthController {

    // @Autowired
    // private AuthenticationManager authenticationManager;

    @Autowired
    AuthService authService;
    
    @GetMapping("/")
    public ResponseEntity<String> getTest() {
        return ResponseEntity.ok("{\"message\":\"Successful BackEnd Connection\"}");
    }

    @GetMapping("/users")
    public ResponseEntity<Object> getUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }
    
    @PostMapping("/signup")
    public ResponseEntity<User> getSignUp(@RequestBody User newUser) {        
        return ResponseEntity.ok(authService.save(newUser));
    }

    @PostMapping("/login")
    public ResponseEntity<String> getLogIn(@RequestBody User user) {
        return ResponseEntity.ok(authService.verify(user));
    }
}
