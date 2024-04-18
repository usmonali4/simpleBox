package com.levelUp.simpleBox.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelUp.simpleBox.model.User;
import com.levelUp.simpleBox.service.UserDetailsServiceImp;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
    @Autowired
    private UserDetailsServiceImp userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<List<User>>(userService.findAllUsers(), HttpStatus.OK);
    }
}
