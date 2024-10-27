package com.camino.camino_v1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.camino.camino_v1.model.User;
import com.camino.camino_v1.model.UserPrincipal;
import com.camino.camino_v1.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(email);

        if(user == null) {
            throw new UsernameNotFoundException(email+" Not Found In DB");
        }

        return new UserPrincipal(user);
    }

    public UserDetails loadUserByUser_id(long user_id) throws UsernameNotFoundException {
        User user = userRepository.getReferenceById(user_id);

        if(user == null) {
            throw new UsernameNotFoundException(user_id+" Not Found In DB");
        }

        return new UserPrincipal(user);
    }
}
