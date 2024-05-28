package com.levelUp.simpleBox.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.levelUp.simpleBox.model.User;
import com.levelUp.simpleBox.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> findUser(String username){
        return userRepository.findByUsername(username);
    }
}
