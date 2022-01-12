package com.izdajMe.izdajMe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.izdajMe.izdajMe.services.FavorHotOfferService;
import com.izdajMe.izdajMe.model.User;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FavorHotOfferController {
    @Autowired
    private FavorHotOfferService favorHotOfferService;

    @PostMapping("/favorHotOffers/removeHotOffer")
    public ResponseEntity<Boolean> removeHotOffer(@RequestBody Long id, HttpServletRequest request){
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                return new ResponseEntity<Boolean>(favorHotOfferService.removeHotOffer(id), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
