package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.Administrator;
import com.izdajMe.izdajMe.services.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AdministratorController {

    @Autowired
    private AdministratorService administratorService;

    @PostMapping("/administrators/login")
    public ResponseEntity<String> loginAdministrator(@RequestBody Administrator administrator) {

        if(administratorService.loginAdministrator(administrator))
            return new ResponseEntity<String>("administrator_found", HttpStatus.OK);
        else
            return new ResponseEntity<String>("administrator_not_found", HttpStatus.NOT_FOUND);
    }
}
