package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.User;

import java.util.List;

public interface UserService {
    public List<User> getAllInstructors();
    public Boolean loginUser(User user);
    public Boolean saveUser(User user);
    public User getUserByEmail(String email);
    public Boolean changeUser(User user);
    public Boolean changePasswordUser(List<User> users);
    public List<User> getAllUsers();
    public Boolean changeAdministratorsPassword(User user);
    public Boolean saveAdmin(User user);
    public Boolean deleteUser(long id);
    public Boolean declineUser(String text);
    public List<User> searchUsersByName(String firstName, String lastName);
    public List<User> searchInstructorsByName(String firstName, String lastName);
    public List<User> searchInstructorsByCountry(String country);
    public Boolean saveClient(User user);
    public void activate(Long id);
    public Boolean acceptUser(long id);
    public Boolean changePrepaid(long id);
    public Boolean addSubscribedUserToInstructor(User user);
    public Boolean removeSubscribedUserFromInstructor(User user);
    public List<User> getUsersSubscribedInstructors(String email);
    public Boolean isUserSubscribedToInstructor(String email, String instructorEmail);
}
