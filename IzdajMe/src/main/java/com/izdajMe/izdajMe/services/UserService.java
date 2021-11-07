package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    public ResponseEntity<String> loginUser(User user);
    public ResponseEntity<String> saveUser(User user);
    public ResponseEntity<User> getUserByEmail(String email);
}
