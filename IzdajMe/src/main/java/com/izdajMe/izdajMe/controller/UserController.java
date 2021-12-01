package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("/users/changeUser")
    public ResponseEntity<Boolean> changeUser(@RequestBody User user) {
        return userService.changeUser(user);
    }
    @PutMapping("/users/changePasswordUser")
    public ResponseEntity<Boolean> changePasswordUser(@RequestBody List<User> users) {
        return userService.changePasswordUser(users);
    }

    @GetMapping("/users/getUserByEmail")
    public ResponseEntity<User> getUserByEmail(@RequestParam("email") String email) {

        return userService.getUserByEmail(email);
    }




}
