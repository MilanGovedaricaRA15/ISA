package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.HotOfferRepository;
import com.izdajMe.izdajMe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CottageRepository cottageRepository;
    @Autowired
    private HotOfferRepository hotOfferRepository;

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
            if(users.get(0).getRole().toString() == User.Role.administratorFirstLogged.toString())
                users.get(0).setRole(User.Role.administrator);
            userRepository.save(users.get(0));
            return true;
        }
        else {
            return false;
        }
    }

    public Boolean changeAdministratorsPassword(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser != null){
            user.setRole(User.Role.administrator);
            userRepository.save(user);
            return true;
        }
        else {
            return false;
        }
    }

    public Boolean saveAdmin(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());

        if(foundUser != null){
            return false;
        }

        user.setRole(User.Role.administratorFirstLogged);
        user.setVerified(true);
        userRepository.save(user);
        return true;

    }

    public Boolean deleteUser(long id) {
        /*List<Cottage> cottages = cottageRepository.findCottagesById(id);
        if(cottages.size() != 0){
            for(Cottage c : cottages){
                List<HotOffer> reservations = hotOfferRepository
                if(reservations.size() != 0) {
                    for(HotOffer hr : reservations) {
                        hotOfferRepository.deleteById(hr.getId());
                    }
                }
                cottageRepository.deleteById(c.getId());
            }
        }*/
        userRepository.deleteById(id);
        return true;
    }
}
