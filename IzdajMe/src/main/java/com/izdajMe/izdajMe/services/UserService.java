package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserService {
    public ResponseEntity<String> loginUser(User user);
    public ResponseEntity<String> saveUser(User user);
    public ResponseEntity<User> getUserByEmail(String email);
    public ResponseEntity<Boolean> changeUser(User user);
    public ResponseEntity<Boolean> changePasswordUser(List<User> users);

}
