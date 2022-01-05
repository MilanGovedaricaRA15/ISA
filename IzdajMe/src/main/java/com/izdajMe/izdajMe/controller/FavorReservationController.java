package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.FavorReservation;
import com.izdajMe.izdajMe.services.FavorReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class FavorReservationController {

    @Autowired
    private FavorReservationService favorReservationService;

    @GetMapping("/favorReservations/getAllReservations")
    public ResponseEntity<List<FavorReservation>> getAllReservations(){
        List<FavorReservation> allReservations = new ArrayList<>();
        for(FavorReservation favorReservation : favorReservationService.getAllReservations()) {
            allReservations.add(favorReservation);
        }

        return new ResponseEntity<List<FavorReservation>>(allReservations, HttpStatus.OK);
    }
}
