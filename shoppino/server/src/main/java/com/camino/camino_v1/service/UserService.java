package com.camino.camino_v1.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camino.camino_v1.dto.UserDetailsDTO;
import com.camino.camino_v1.model.User;
import com.camino.camino_v1.repository.UserRepository;

@Service
public class UserService {

    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public boolean updateUserDetails(long user_id, UserDetailsDTO userDetailsDTO) {

        if(user_id <= 0) {
            logger.warn("updateing  user id id is null");
            return false;
        }

        try {
           Optional<User> optionalUser = userRepository.findById(user_id);
           if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            User updatedUser = updateUsersDetails(user, userDetailsDTO);
            userRepository.save(updatedUser);
            logger.info("{} is updated", updatedUser.toString());
            return true;
           }
           else {
            logger.warn("{} not found ", user_id);
           }
        } catch (Exception e) {
            logger.error("Try to Update the user , Failed \n {}",e.getLocalizedMessage());
        }
        return false;
    }



    private User updateUsersDetails(User user, UserDetailsDTO userDetailsDTO) {

           if(userDetailsDTO.getAddress1() != null)
           user.setAddress1(userDetailsDTO.getAddress1());

           if(userDetailsDTO.getAddress2() != null)
           user.setAddress2(userDetailsDTO.getAddress2());

           if(userDetailsDTO.getAge() > 0) 
           user.setAge(userDetailsDTO.getAge());

           if(userDetailsDTO.getGender() != null) 
           user.setGender(userDetailsDTO.getGender());

           if(userDetailsDTO.getMobileNo() != null)
           user.setMobileNo(userDetailsDTO.getMobileNo());

           if(userDetailsDTO.getPostalCode() != null)
           user.setPostalCode(userDetailsDTO.getPostalCode());

           return user;
    }
    
}
