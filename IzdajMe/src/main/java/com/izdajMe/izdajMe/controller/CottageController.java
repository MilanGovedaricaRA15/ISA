package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.CottageService;
import com.izdajMe.izdajMe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class CottageController {
    @Autowired
    private CottageService cottageService ;

    @GetMapping("/cottages/getAllCottagesOfOwner")
    public ResponseEntity<List<Cottage>> getAllCottagesOfOwner(@RequestParam("email") String email) {

        return cottageService.getAllCottagesOfOwner(email);
    }
    @GetMapping("/cottages/getAllCottages")
    public ResponseEntity<List<Cottage>> getAllCottages(){

        return  cottageService.getAllCottages();
    }
    @PutMapping("/cottages/removeCottageImg")
    public ResponseEntity<Void> removeCottageImg(@RequestBody Cottage cottage){
       return cottageService.removeCottageImg(cottage);
    }
    @PutMapping("/cottages/changeCottage")
    public ResponseEntity<Void> changeCottage(@RequestBody Cottage cottage){
       return cottageService.changeCottage(cottage);
    }
}
