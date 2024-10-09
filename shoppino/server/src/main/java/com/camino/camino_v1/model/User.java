package com.camino.camino_v1.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class User {
    
    @Id
    private String id;

    private String username;
    
    private String email;

    private String password;

    private Role role;

    public User(String username, String email,String password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    public enum Role {
        USER,
        ADMIN;
    }
    
}
