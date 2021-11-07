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

    public ResponseEntity<String> loginUser(User user) {
        Iterable<User> allUsers = userRepository.findAll();

        ArrayList<User> allUsersList = new ArrayList<User>();
        allUsers.forEach(allUsersList::add);

        for(User user1 : allUsersList) {
            if(user1.getEmail().equals(user.getEmail())){
                if(user1.getPassword().equals(user.getPassword())) {
                    if(user1.isVerified()) {
                        return new ResponseEntity<String>("user_found",HttpStatus.OK);
                    }
                    else {
                        return new ResponseEntity<String>("user_not_found",HttpStatus.NOT_FOUND);
                    }
                }
                else{
                    return new ResponseEntity<String>("user_not_found",HttpStatus.NOT_FOUND);
                }
            }
        }
        return new ResponseEntity<String>("user_not_found",HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<String> saveUser(User user) {
        Iterable<User> allUsers = userRepository.findAll();
        ArrayList<User> allUsersList = new ArrayList<User>();
        allUsers.forEach(allUsersList::add);
        for(User user1 : allUsersList) {
            if(user1.getEmail().equals(user.getEmail())){
                return new ResponseEntity<String>("user_already_registered",HttpStatus.NOT_ACCEPTABLE);
            }
        }

        user.setVerified(true); //false
        userRepository.save(user);
        return new ResponseEntity<String>("user_registered",HttpStatus.CREATED);

    }

    public ResponseEntity<User> getUserByEmail(String email) {
        Iterable<User> allUsers = userRepository.findAll();
        ArrayList<User> allUsersList = new ArrayList<User>();
        allUsers.forEach(allUsersList::add);
        for(User user1 : allUsersList) {
            if(user1.getEmail().equals(email)){
                if(user1.isVerified()) {
                    return new ResponseEntity<User>(user1,HttpStatus.OK);
                }
                else{
                    return new ResponseEntity<User>((User) null,HttpStatus.NOT_FOUND);
                }
            }
        }
        return new ResponseEntity<User>((User)null,HttpStatus.NOT_FOUND);
    }
}
