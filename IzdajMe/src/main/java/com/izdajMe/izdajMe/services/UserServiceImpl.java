package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Ship;
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

    @Override
    public List<User> getAllUsers() {
        Iterable<User> allUsers = userRepository.findAll();
        ArrayList<User> allUsersList = new ArrayList<User>();
        allUsers.forEach(allUsersList::add);

        return allUsersList;
    }

    @Override
    public List<User> getAllInstructors() {
        Iterable<User> allUsers = userRepository.findAll();
        ArrayList<User> allInstructorsList = new ArrayList<User>();
        for (User user : allUsers) {
            if (user.getRole().equals(User.Role.instructor)) {
                allInstructorsList.add(user);
            }
        }

        return allInstructorsList;
    }

    public Boolean loginUser(User user) {
        User foundUser = userRepository.findByEmailAndPasswordVerified(user.getEmail(),user.getPassword());

        if (foundUser != null){
            return true;
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
        User foundUser = userRepository.findByEmailVerified(email);
        if(foundUser != null) {
            return foundUser;
        }
        else {
            return null;
        }
    }

    public Boolean changeUser(User user) {
        User foundUser = userRepository.findByIdAndPassword(user.getId(),user.getPassword());
       if (foundUser != null){
           userRepository.save(user);
           return true;
        }
        else {
            return false;
        }
    }

    public Boolean changePasswordUser(List<User> users) {
        User foundUser = userRepository.findByIdAndPassword(users.get(0).getId(),users.get(1).getPassword());
        if (foundUser != null){
            userRepository.save(users.get(0));
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public List<User> searchUsersByName(String firstName, String lastName) {
        List<User> searchedShips = new ArrayList<>();

        List<User> users = userRepository.findAll();
        for (User s : users) {
            if (s.getFirstName().toLowerCase().contains(firstName.toLowerCase())
            && s.getLastName().toLowerCase().contains(lastName.toLowerCase())){
                searchedShips.add(s);
            }
        }

        return searchedShips;
    }

    @Override
    public List<User> searchInstructorsByName(String firstName, String lastName) {
        List<User> searchedShips = new ArrayList<>();

        List<User> users = userRepository.findAll();
        for (User s : users) {
            if (s.getRole().equals(User.Role.instructor)) {
                if (s.getFirstName().toLowerCase().contains(firstName.toLowerCase())
                        && s.getLastName().toLowerCase().contains(lastName.toLowerCase())){
                    searchedShips.add(s);
                }
            }
        }

        return searchedShips;
    }

}
