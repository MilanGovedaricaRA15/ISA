package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;
import java.util.stream.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    public Boolean loginUser(User user) {
        User foundUser = userRepository.findByEmailAndPassword(user.getEmail(),user.getPassword());
        if (foundUser != null){
            if(foundUser.isVerified()) {
                return true;
            }
            else {
                return false;
            }
        }
        else{
            return false;
        }
    }

    public Boolean saveUser(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());

        if(foundUser != null){
            return true;
        }

        user.setVerified(true); //false
        userRepository.save(user);
        return false;
    }

    public User getUserByEmail(String email) {
        User foundUser = userRepository.findByEmail(email);
        if(foundUser != null) {
            if (foundUser.isVerified()) {
                return foundUser;
            } else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    public Boolean changeUser(User user) {
       if (userRepository.findById(user.getId()).get().getPassword().equals(user.getPassword())){
           userRepository.save(user);
           return true;
        }
        else {
            return false;
        }
    }

    public Boolean changePasswordUser(List<User> users) {
        if (userRepository.findById(users.get(0).getId()).get().getPassword().equals(users.get(1).getPassword())){
            userRepository.save(users.get(0));
            return true;
        }
        else {
            return false;
        }
    }

}
