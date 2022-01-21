package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.UserDTO;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://izdajme.herokuapp.com/")

public class UserController {

    @Autowired
    private UserService userService ;

    @GetMapping("/users/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> allUsers = new ArrayList<>();
        for(User user : userService.getAllUsers()) {
            allUsers.add(user);
        }

        return new ResponseEntity<List<User>>(allUsers, HttpStatus.OK);
    }

    @GetMapping("/users/getAllInstructors")
    public ResponseEntity<List<User>> getAllInstructors(){
        List<User> allInstructors = new ArrayList<>();
        for(User user : userService.getAllUsers()) {
            if (user.getRole().equals(User.Role.instructor)) {
                allInstructors.add(user);
            }
        }

        return new ResponseEntity<List<User>>(allInstructors, HttpStatus.OK);
    }

    @PostMapping("/users/login")
    public String loginUser(@RequestBody User user, HttpServletRequest request,HttpServletResponse response) {

        if (userService.loginUser(user)){
            User.Role userRole = userService.getUserByEmail(user.getEmail()).getRole();
            if(request.getSession().getAttribute("role") == null){
                request.getSession(true).setAttribute("role",userRole);
            }
            else{
                request.getSession(false).setAttribute("role",userRole);
            }
            HttpCookie cookie = ResponseCookie.from("SESSION", request.getSession().getId())
                    .httpOnly(true)
                    .sameSite("None")
                    .secure(true)
                    .path("/")
                    .build();
           response.addHeader("SET_COOKIE",cookie.toString());
           return "user_found";
        }
        else {
           return "user_not_found";
        }
    }

    @PostMapping("/users/register")
    public ResponseEntity<String> saveUser(@RequestBody User user) {

        if(userService.saveUser(user)){
           return new ResponseEntity<String>("user_already_registered",HttpStatus.NOT_ACCEPTABLE);
        }
        else{
           return new ResponseEntity<String>("user_registered",HttpStatus.CREATED);
        }
    }

    @PostMapping("/users/addAdmin")
    public ResponseEntity<String> saveAdmin(@RequestBody User user){
        if(!userService.saveAdmin(user)){
            return new ResponseEntity<String>("user_already_registered",HttpStatus.NOT_ACCEPTABLE);
        }
        else{
            return new ResponseEntity<String>("user_registered",HttpStatus.CREATED);
        }
    }

    @PostMapping("/users/registerClient")
    public ResponseEntity<String> saveClient(@RequestBody User user) {

        if(userService.saveClient(user)){
            return new ResponseEntity<String>("user_already_registered",HttpStatus.NOT_ACCEPTABLE);
        }
        else{
            return new ResponseEntity<String>("user_registered",HttpStatus.CREATED);
        }

    }

    @PutMapping("/users/changeUser")
    public ResponseEntity<Boolean> changeUser(@RequestBody User user, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser || request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser
                    || request.getSession(false).getAttribute("role") == User.Role.instructor || request.getSession(false).getAttribute("role") == User.Role.client) {
                if (userService.changeUser(user)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/users/changePasswordUser")
    public ResponseEntity<Boolean> changePasswordUser(@RequestBody List<User> users, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser || request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser
                    || request.getSession(false).getAttribute("role") == User.Role.instructor || request.getSession(false).getAttribute("role") == User.Role.client) {
                if (userService.changePasswordUser(users)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/users/changeAdministratorsPassword")
    public ResponseEntity<Boolean> changeAdministratorsPassword(@RequestBody User user) {
        if(userService.changeAdministratorsPassword(user)){
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/users/changePrepaid")
    public ResponseEntity<Boolean> changePrepaid(@RequestBody long id) {
        if(userService.changePrepaid(id)){
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/users/deleteUser")
    public ResponseEntity<Boolean> deleteUser(@RequestBody Long id){
        return new ResponseEntity<Boolean>(userService.deleteUser(id), HttpStatus.OK);
    }

    @PostMapping("/users/declineUser")
    public ResponseEntity<Boolean> declineUser(@RequestBody String text){
        return new ResponseEntity<Boolean>(userService.declineUser(text), HttpStatus.OK);
    }

    @PostMapping("/users/acceptUser")
    public ResponseEntity<Boolean> acceptUser(@RequestBody Long id) {
        return new ResponseEntity<Boolean>(userService.acceptUser(id), HttpStatus.OK);
    }

    @GetMapping("/users/getUserByEmail")
    public ResponseEntity<UserDTO> getUserByEmail(@RequestParam("email") String email, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser || request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser
            || request.getSession(false).getAttribute("role") == User.Role.client || request.getSession(false).getAttribute("role") == User.Role.administrator
            || request.getSession(false).getAttribute("role") == User.Role.administratorFirstLogged || request.getSession(false).getAttribute("role") == User.Role.administratorSuperior
            || request.getSession(false).getAttribute("role") == User.Role.instructor) {
                User user = userService.getUserByEmail(email);
                if (user != null) {
                    return new ResponseEntity<UserDTO>(new UserDTO(user), HttpStatus.OK);
                } else {
                    return new ResponseEntity<UserDTO>((UserDTO) null, HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<UserDTO>((UserDTO) null, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<UserDTO>((UserDTO) null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/users/getInstructorByEmail")
    public ResponseEntity<User> getInstructorByEmail(@RequestParam("email") String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<User>((User) null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/searchInstructorsByName")
    public ResponseEntity<List<User>> searchInstructorsByName(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName) {
        return new ResponseEntity<List<User>>(userService.searchInstructorsByName(firstName, lastName), HttpStatus.OK);
    }

    @GetMapping("/users/activate")
    @CrossOrigin(origins = "*")
    public ResponseEntity<UserDTO> getUserByEmail(@RequestParam("id") Long id) {
        userService.activate(id);
        return new ResponseEntity<UserDTO>((UserDTO) null, HttpStatus.OK);
    }


}
