package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.UserDTO;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class UserController {

    @Autowired
    private UserService userService ;

    @PostMapping("/users/login")
    public ResponseEntity<String> loginUser(@RequestBody User user, HttpServletRequest request) {

        if (userService.loginUser(user)){
            User.Role userRole = userService.getUserByEmail(user.getEmail()).getRole();
            if(request.getSession().getAttribute("role") == null){
                request.getSession(true).setAttribute("role",userRole);
            }
            else{
                request.getSession(false).setAttribute("role",userRole);
            }
           return new ResponseEntity<String>("user_found", HttpStatus.OK);
        }
        else {
           return new ResponseEntity<String>("user_not_found",HttpStatus.NOT_FOUND);
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

    @PutMapping("/users/changeUser")
    public ResponseEntity<Boolean> changeUser(@RequestBody User user, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser || request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
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
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser || request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
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

    @GetMapping("/users/getUserByEmail")
    public ResponseEntity<UserDTO> getUserByEmail(@RequestParam("email") String email, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser || request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
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




}
