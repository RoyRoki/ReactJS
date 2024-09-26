package com.camino.camino_v1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.camino.camino_v1.model.User;

public interface UserRepository extends MongoRepository<User, String> {

    @Query("{name:'?0'}")
    User findUserByName(String name);

    @Query("{email:'?0'}")
    User findUserByEmail(String email);

    boolean existsByEmail(String email);
}