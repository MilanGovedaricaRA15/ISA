package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Ship;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;
import java.util.stream.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

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

    public Boolean saveClient(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());

        if(foundUser != null){
            return true;
        }

        user.setVerified(false); //false
        userRepository.save(user);
        sendNotificationForReservation(user);
        return false;
    }

    private void sendNotificationForReservation(User user) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Activate your account");
        mail.setText("To activate your account press this link: " + "http://localhost:8080/users/activate?id=" + user.getId());
        emailService.sendSimpleMessage(mail);
    }

    public void activate(Long id){
        User user = userRepository.findById(id).get();
        user.setVerified(true);
        userRepository.save(user);
    }

}
