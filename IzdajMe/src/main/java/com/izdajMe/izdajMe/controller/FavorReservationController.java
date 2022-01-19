package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.CottageReservationDTO;
import com.izdajMe.izdajMe.dto.FavorReservationDTO;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.FavorReservation;
import com.izdajMe.izdajMe.model.ShipReservation;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.FavorReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @GetMapping("/favorReservations/getReservationById")
    public ResponseEntity<FavorReservationDTO> getById(@RequestParam("id") Long id) {
        return new ResponseEntity<FavorReservationDTO>(new FavorReservationDTO(favorReservationService.getById(id)), HttpStatus.OK);
    }

    @GetMapping("/favorReservations/getAllReservationsOfFavorFromTill")
    public ResponseEntity<List<FavorReservationDTO>> getAllReservationsOfFavorFromTill(@RequestParam("id") Long id, @RequestParam("from") String from, @RequestParam("to") String to) {

        List<FavorReservationDTO> reservations = new ArrayList<FavorReservationDTO>();
        for (FavorReservation fr : favorReservationService.getAllReservationsOfFavorFromTill(id, from, to)) {
            reservations.add(new FavorReservationDTO(fr));
        }
        return new ResponseEntity<List<FavorReservationDTO>>(reservations, HttpStatus.OK);
    }

    @GetMapping("/favorReservations/getAllReservationsFromTill")
    public ResponseEntity<List<FavorReservationDTO>> getAllReservationsFromTill(@RequestParam("id") Long id,@RequestParam("from") String from, @RequestParam("to") String to) {

        List<FavorReservationDTO> reservations = new ArrayList<FavorReservationDTO>();
        for (FavorReservation fr : favorReservationService.getAllReservationsFromTill(id, from, to)) {
            reservations.add(new FavorReservationDTO(fr));
        }
        return new ResponseEntity<List<FavorReservationDTO>>(reservations, HttpStatus.OK);
    }

    @GetMapping("/favorReservations/getAllReservationsOfFavor")
    public ResponseEntity<List<FavorReservationDTO>> getAllReservationsOfFavor(@RequestParam("id") Long id) {

        List<FavorReservationDTO> favorsList = new ArrayList<FavorReservationDTO>();
        for (FavorReservation fr : favorReservationService.getAllReservationsOfFavor(id)) {
            favorsList.add(new FavorReservationDTO(fr));
        }
        return new ResponseEntity<List<FavorReservationDTO>>(favorsList, HttpStatus.OK);
    }

    @PostMapping("/favorReservations/addReservationByOwner")
    public ResponseEntity<Boolean> addReservationByOwner(@RequestBody FavorReservation favorReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                return new ResponseEntity<Boolean>(favorReservationService.addReservationByOwner(favorReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/favorReservations/addReservationByClient")
    public ResponseEntity<Boolean> addReservationByClient(@RequestBody FavorReservation favorReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(favorReservationService.addReservationByClient(favorReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/favorReservations/addFavorHotOfferReservationByClient")
    public ResponseEntity<Boolean> addFavorHotOfferReservationByClient(@RequestBody FavorReservation favorReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(favorReservationService.addFavorHotOfferReservationByClient(favorReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/favorReservations/changeReservationByInstructor")
    public ResponseEntity<Boolean> changeReservationByInstructor(@RequestBody FavorReservation favorReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                return new ResponseEntity<Boolean>(favorReservationService.changeReservationByInstructor(favorReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/favorReservations/getAllReservationsOfInstructorFavors")
    public ResponseEntity<List<FavorReservation>> getAllReservationsOfInstructorFavors(@RequestParam("email") String email){
        List<FavorReservation> allReservations = new ArrayList<>();
        for(FavorReservation favorReservation : favorReservationService.getAllReservationsOfInstructorFavors(email)) {
            allReservations.add(favorReservation);
        }

        return new ResponseEntity<List<FavorReservation>>(allReservations, HttpStatus.OK);
    }

    @GetMapping("/favorReservations/getFavorReservationsOfClient")
    public ResponseEntity<List<FavorReservationDTO>> getFavorReservationsOfClient(@RequestParam("email") String email) {
        List<FavorReservationDTO> clientFavorReservations = new ArrayList<FavorReservationDTO>();
        for (FavorReservation c : favorReservationService.getFavorReservationsOfClient(email)) {
            clientFavorReservations.add(new FavorReservationDTO(c));
        }

        return new ResponseEntity<List<FavorReservationDTO>>(clientFavorReservations, HttpStatus.OK);
    }

    @PutMapping("/favorReservations/cancelFavorReservationByClient")
    public ResponseEntity<Boolean> cancelFavorReservationByClient(@RequestBody FavorReservation favorReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(favorReservationService.cancelFavorReservationByClient(favorReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
