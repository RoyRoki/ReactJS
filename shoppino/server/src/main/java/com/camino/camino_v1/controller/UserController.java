package com.camino.camino_v1.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camino.camino_v1.dto.UserDetailsDTO;
import com.camino.camino_v1.service.UserService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;


@RestController("userController")
@RequestMapping("/user")
public class UserController {
    
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PutMapping("update/{id}")
    public ResponseEntity<String> putMethodName(@PathVariable String id, @RequestBody UserDetailsDTO userDetailsDTO) {
        logger.info("hit /user/update/"+id);
        logger.info("updating data = {}", userDetailsDTO.toString());
        if(userService.updateUserDetails(Long.parseLong(id), userDetailsDTO)) {
            return ResponseEntity.ok().body("user update successful");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("failed");
    }
}
