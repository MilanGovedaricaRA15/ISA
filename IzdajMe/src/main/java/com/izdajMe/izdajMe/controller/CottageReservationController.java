package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.CottageReservationDTO;
import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.services.CottageReservationService;
import com.izdajMe.izdajMe.services.CottageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CottageReservationController {
    @Autowired
    private CottageReservationService cottageReservationService ;

    @GetMapping("/cottageReservation/getAllReservationsOfCottage")
    public ResponseEntity<List<CottageReservationDTO>> getAllReservationsOfCottage(@RequestParam("id") Long id) {

        List<CottageReservationDTO> list = new ArrayList<CottageReservationDTO>();
        for (CottageReservation c : cottageReservationService.getAllReservationsOfCottage(id)){
            list.add(new CottageReservationDTO(c));
        }
        return new ResponseEntity<List<CottageReservationDTO>>(list, HttpStatus.OK);
    }

    @GetMapping("/cottageReservation/getAllReservationsOfOwner")
    public ResponseEntity<List<CottageReservationDTO>> getAllReservationsOfOwner(@RequestParam("email") String email) {
        List<CottageReservationDTO> list = new ArrayList<CottageReservationDTO>();
        for (CottageReservation c : cottageReservationService.getAllReservationsOfOwner(email)){
            list.add(new CottageReservationDTO(c));
        }

        return new ResponseEntity<List<CottageReservationDTO>>(list, HttpStatus.OK);
    }

    @PostMapping("/cottageReservation/addReservationByOwner")
    public ResponseEntity<Boolean> addReservationByOwner(@RequestBody CottageReservation cottageReservation) {
        return new ResponseEntity<Boolean>(cottageReservationService.addReservationByOwner(cottageReservation), HttpStatus.OK);
    }
}
