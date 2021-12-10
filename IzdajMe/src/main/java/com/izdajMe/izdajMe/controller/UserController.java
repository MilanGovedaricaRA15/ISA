package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.UserDTO;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService ;

    @PostMapping("/users/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {

        if (userService.loginUser(user)){
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

    @PostMapping("/users/addAdmin")
    public ResponseEntity<String> saveAdmin(@RequestBody User user){
        if(!userService.saveAdmin(user)){
            return new ResponseEntity<String>("user_already_registered",HttpStatus.NOT_ACCEPTABLE);
        }
        else{
            return new ResponseEntity<String>("user_registered",HttpStatus.CREATED);
        }
    }

    @PutMapping("/users/changeUser")
    public ResponseEntity<Boolean> changeUser(@RequestBody User user) {
        if (userService.changeUser(user)){
           return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        else{
           return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @PutMapping("/users/changePasswordUser")
    public ResponseEntity<Boolean> changePasswordUser(@RequestBody List<User> users) {
        if(userService.changePasswordUser(users)){
           return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        else{
           return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
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

    @GetMapping("/users/getUserByEmail")
    public ResponseEntity<UserDTO> getUserByEmail(@RequestParam("email") String email) {
        User user = userService.getUserByEmail(email);
        if(user != null){
           return new ResponseEntity<UserDTO>(new UserDTO(user), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<UserDTO>((UserDTO) null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/getAllUsers")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> list = new ArrayList<UserDTO>();
        for(User user : userService.getAllUsers()){
            list.add(new UserDTO(user));
        }
        return new ResponseEntity<List<UserDTO>>(list, HttpStatus.OK);
    }


}
