package com.camino.camino_v1.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.camino.camino_v1.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

   
    User findUserByUsername(String username);

   
    User findUserByEmail(String email);

    boolean existsByEmail(String email);
}