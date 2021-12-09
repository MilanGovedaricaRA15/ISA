package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

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

    public List<User> getAllUsers(){
        Iterable<User> allUsers = userRepository.findAll();
        ArrayList<User> allUsersList = new ArrayList<User>();
        allUsers.forEach(allUsersList::add);
        return allUsersList;
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

}
