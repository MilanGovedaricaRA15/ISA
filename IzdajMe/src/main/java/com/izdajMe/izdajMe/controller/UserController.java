package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService ;

    @PostMapping("/users/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }

    @PostMapping("/users/register")
    public ResponseEntity<String> saveUser(@RequestBody User user) {

        return userService.saveUser(user);

    }

    @GetMapping("/users/getUserByEmail")
    public ResponseEntity<User> getUserByEmail(@RequestParam("email") String email) {

        return userService.getUserByEmail(email);
    }




}
