package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.UserRepository;
import com.izdajMe.izdajMe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository ;

    @PostMapping("/users/login")
    public String loginUser(@RequestBody User user) {
        Iterable<User> allUsers = userRepository.findAll();
        List<User> allUsersList = new ArrayList<User>();
        allUsers.forEach(allUsersList::add);
        for(User user1 : allUsersList) {
            if(user1.getEmail().equals(user.getEmail())){
                if(user1.getPassword().equals(user.getPassword())) {
                    if(user1.isVerified()) {
                        return "user_found";
                    }
                    else {
                        return "user_not_found";
                    }
                }
                else{
                    return "user_not_found";
                }
            }
        }
        return "user_not_found";
    }

    @PostMapping("/users/register")
    public String saveUser(@RequestBody User user) {
        Iterable<User> allUsers = userRepository.findAll();
        List<User> allUsersList = new ArrayList<User>();
        allUsers.forEach(allUsersList::add);
        for(User user1 : allUsersList) {
            if(user1.getEmail().equals(user.getEmail())){
                return "user_already_registered";
            }
        }

        user.setVerified(false);
        userRepository.save(user);
        return "user_registered";

    }


}
