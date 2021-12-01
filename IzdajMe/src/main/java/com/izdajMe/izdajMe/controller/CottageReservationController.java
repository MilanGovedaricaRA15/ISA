package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.services.CottageReservationService;
import com.izdajMe.izdajMe.services.CottageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CottageReservationController {
    @Autowired
    private CottageReservationService cottageReservationService ;

    @GetMapping("/cottageReservation/getAllReservationsOfCottage")
    public ResponseEntity<List<CottageReservation>> getAllReservationsOfCottage(@RequestParam("id") Long id) {
        return cottageReservationService.getAllReservationsOfCottage(id);
    }

    @GetMapping("/cottageReservation/getAllReservationsOfOwner")
    public ResponseEntity<List<CottageReservation>> getAllReservationsOfOwner(@RequestParam("email") String email) {
        return cottageReservationService.getAllReservationsOfOwner(email);
    }

    @PostMapping("/cottageReservation/addReservationByOwner")
    public ResponseEntity<Boolean> addReservationByOwner(@RequestBody CottageReservation cottageReservation) {
        return cottageReservationService.addReservationByOwner(cottageReservation);
    }
}
