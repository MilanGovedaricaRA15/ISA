package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public List<User> getAllInstructors();
    public Boolean loginUser(User user);
    public Boolean saveUser(User user);
    public User getUserByEmail(String email);
    public Boolean changeUser(User user);
    public Boolean changePasswordUser(List<User> users);
    public List<User> searchUsersByName(String firstName, String lastName);
    List<User> searchInstructorsByName(String firstName, String lastName);
}
