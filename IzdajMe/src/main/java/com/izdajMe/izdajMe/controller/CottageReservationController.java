package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.CottageReservationDTO;
import com.izdajMe.izdajMe.dto.FavorReservationDTO;
import com.izdajMe.izdajMe.dto.ShipReservationDTO;
import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.services.CottageReservationService;
import com.izdajMe.izdajMe.services.CottageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CottageReservationController {
    @Autowired
    private CottageReservationService cottageReservationService;

    @GetMapping("/cottageReservation/getAllReservationsOfCottage")
    public ResponseEntity<List<CottageReservationDTO>> getAllReservationsOfCottage(@RequestParam("id") Long id) {

        List<CottageReservationDTO> list = new ArrayList<CottageReservationDTO>();
        for (CottageReservation c : cottageReservationService.getAllReservationsOfCottage(id)) {
            list.add(new CottageReservationDTO(c));
        }
        return new ResponseEntity<List<CottageReservationDTO>>(list, HttpStatus.OK);
    }

    @GetMapping("/cottageReservation/getAllReservations")
    public ResponseEntity<List<CottageReservation>> getAllReservations(){
        List<CottageReservation> allReservations = new ArrayList<>();
        for(CottageReservation cottageReservation : cottageReservationService.getAllReservations()) {
            allReservations.add(cottageReservation);
        }

        return new ResponseEntity<List<CottageReservation>>(allReservations, HttpStatus.OK);
    }

    @GetMapping("/cottageReservation/getAllReservationsFromBaseFromTill")
    public ResponseEntity<List<CottageReservation>> getAllReservationsFromBaseFromTill(@RequestParam("from") String from, @RequestParam("to") String to) {
        List<CottageReservation> reservations = new ArrayList<>(cottageReservationService.getAllReservationsFromBaseFromTill(from ,to));

        return new ResponseEntity<List<CottageReservation>>(reservations, HttpStatus.OK);
    }

    @GetMapping("/cottageReservation/getAllReservationsOfCottageFromTill")
    public ResponseEntity<List<CottageReservationDTO>> getAllReservationsOfCottageFromTill(@RequestParam("id") Long id, @RequestParam("from") String from, @RequestParam("to") String to) {

        List<CottageReservationDTO> list = new ArrayList<CottageReservationDTO>();
        for (CottageReservation c : cottageReservationService.getAllReservationsOfCottageFromTill(id, from, to)) {
            list.add(new CottageReservationDTO(c));
        }
        return new ResponseEntity<List<CottageReservationDTO>>(list, HttpStatus.OK);
    }

    @GetMapping("/cottageReservation/getById")
    public ResponseEntity<CottageReservationDTO> getById(@RequestParam("id") Long id) {
        return new ResponseEntity<CottageReservationDTO>(new CottageReservationDTO(cottageReservationService.getById(id)), HttpStatus.OK);
    }

    @GetMapping("/cottageReservation/getAllReservationsOfOwner")
    public ResponseEntity<List<CottageReservationDTO>> getAllReservationsOfOwner(@RequestParam("email") String email, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                List<CottageReservationDTO> list = new ArrayList<CottageReservationDTO>();
                for (CottageReservation c : cottageReservationService.getAllReservationsOfOwner(email)) {
                    list.add(new CottageReservationDTO(c));
                }

                return new ResponseEntity<List<CottageReservationDTO>>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<List<CottageReservationDTO>>(new ArrayList<CottageReservationDTO>(), HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<List<CottageReservationDTO>>(new ArrayList<CottageReservationDTO>(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/cottageReservation/addReservationByOwner")
    public ResponseEntity<Boolean> addReservationByOwner(@RequestBody CottageReservation cottageReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                return new ResponseEntity<Boolean>(cottageReservationService.addReservationByOwner(cottageReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/cottageReservation/addReservationByClient")
    public ResponseEntity<Boolean> addReservationByClient(@RequestBody CottageReservation cottageReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(cottageReservationService.addReservationByClient(cottageReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/cottageReservation/addHotOfferReservationByClient")
    public ResponseEntity<Boolean> addHotOfferReservationByClient(@RequestBody CottageReservation cottageReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(cottageReservationService.addHotOfferReservationByClient(cottageReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/cottageReservation/changeReservationByOwner")
    public ResponseEntity<Boolean> changeReservationByOwner(@RequestBody CottageReservation cottageReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                return new ResponseEntity<Boolean>(cottageReservationService.changeReservationByOwner(cottageReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/cottageReservation/getCottageReservationsOfClient")
    public ResponseEntity<List<CottageReservationDTO>> getCottageReservationsOfClient(@RequestParam("email") String email) {
        List<CottageReservationDTO> clientCottageReservations = new ArrayList<CottageReservationDTO>();
        for (CottageReservation c : cottageReservationService.getCottageReservationsOfClient(email)) {
            clientCottageReservations.add(new CottageReservationDTO(c));
        }

        return new ResponseEntity<List<CottageReservationDTO>>(clientCottageReservations, HttpStatus.OK);
    }

    @PutMapping("/cottageReservation/cancelCottageReservationByClient")
    public ResponseEntity<Boolean> cancelCottageReservationByClient(@RequestBody CottageReservation cottageReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(cottageReservationService.cancelCottageReservationByClient(cottageReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
