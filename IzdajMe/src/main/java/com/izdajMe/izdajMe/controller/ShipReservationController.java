package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.CottageReservationDTO;
import com.izdajMe.izdajMe.dto.ShipReservationDTO;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.ShipReservation;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.CottageReservationService;
import com.izdajMe.izdajMe.services.ShipReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ShipReservationController {
    @Autowired
    private ShipReservationService shipReservationService;

    @GetMapping("/shipReservation/getAllReservationsOfShip")
    public ResponseEntity<List<ShipReservationDTO>> getAllReservationsOfShip(@RequestParam("id") Long id) {

        List<ShipReservationDTO> list = new ArrayList<ShipReservationDTO>();
        for (ShipReservation c : shipReservationService.getAllReservationsOfShip(id)) {
            list.add(new ShipReservationDTO(c));
        }
        return new ResponseEntity<List<ShipReservationDTO>>(list, HttpStatus.OK);
    }

    @GetMapping("/shipReservation/getAllReservations")
    public ResponseEntity<List<ShipReservation>> getAllReservations(){
        List<ShipReservation> allReservations = new ArrayList<>();
        for(ShipReservation shipReservation : shipReservationService.getAllReservations()) {
            allReservations.add(shipReservation);
        }

        return new ResponseEntity<List<ShipReservation>>(allReservations, HttpStatus.OK);
    }

    @GetMapping("/shipReservation/getAllReservationsFromBaseFromTill")
    public ResponseEntity<List<ShipReservationDTO>> getAllReservationsFromBaseFromTill(@RequestParam("from") String from, @RequestParam("to") String to) {

        List<ShipReservationDTO> reservations = new ArrayList<>();
        for (ShipReservation sr : shipReservationService.getAllReservationsFromBaseFromTill(from, to)) {
            reservations.add(new ShipReservationDTO(sr));
        }
        return new ResponseEntity<List<ShipReservationDTO>>(reservations, HttpStatus.OK);
    }

    @GetMapping("/shipReservation/getAllReservationsOfShipFromTill")
    public ResponseEntity<List<ShipReservationDTO>> getAllReservationsOfShipFromTill(@RequestParam("id") Long id, @RequestParam("from") String from, @RequestParam("to") String to) {

        List<ShipReservationDTO> list = new ArrayList<ShipReservationDTO>();
        for (ShipReservation c : shipReservationService.getAllReservationsOfShipFromTill(id, from, to)) {
            list.add(new ShipReservationDTO(c));
        }
        return new ResponseEntity<List<ShipReservationDTO>>(list, HttpStatus.OK);
    }

    @GetMapping("/shipReservation/getById")
    public ResponseEntity<ShipReservationDTO> getById(@RequestParam("id") Long id) {
        return new ResponseEntity<ShipReservationDTO>(new ShipReservationDTO(shipReservationService.getById(id)), HttpStatus.OK);
    }

    @GetMapping("/shipReservation/getAllReservationsOfOwner")
    public ResponseEntity<List<ShipReservationDTO>> getAllReservationsOfOwner(@RequestParam("email") String email, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                List<ShipReservationDTO> list = new ArrayList<ShipReservationDTO>();
                for (ShipReservation c : shipReservationService.getAllReservationsOfOwner(email)) {
                    list.add(new ShipReservationDTO(c));
                }

                return new ResponseEntity<List<ShipReservationDTO>>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<List<ShipReservationDTO>>(new ArrayList<ShipReservationDTO>(), HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<List<ShipReservationDTO>>(new ArrayList<ShipReservationDTO>(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/shipReservation/addReservationByOwner")
    public ResponseEntity<Boolean> addReservationByOwner(@RequestBody ShipReservation shipReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                return new ResponseEntity<Boolean>(shipReservationService.addReservationByOwner(shipReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/shipReservation/addReservationByClient")
    public ResponseEntity<Boolean> addReservationByClient(@RequestBody ShipReservation shipReservation,HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(shipReservationService.addReservationByClient(shipReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/shipReservation/addShipHotOfferReservationByClient")
    public ResponseEntity<Boolean> addShipHotOfferReservationByClient(@RequestBody ShipReservation shipReservation,HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(shipReservationService.addShipHotOfferReservationByClient(shipReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/shipReservation/changeReservationByOwner")
    public ResponseEntity<Boolean> changeReservationByOwner(@RequestBody ShipReservation shipReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                return new ResponseEntity<Boolean>(shipReservationService.changeReservationByOwner(shipReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/shipReservation/getShipReservationsOfClient")
    public ResponseEntity<List<ShipReservationDTO>> getShipReservationsOfClient(@RequestParam("email") String email) {
        List<ShipReservationDTO> clientShipReservations = new ArrayList<ShipReservationDTO>();
        for (ShipReservation s : shipReservationService.getShipReservationsOfClient(email)) {
            clientShipReservations.add(new ShipReservationDTO(s));
        }

        return new ResponseEntity<List<ShipReservationDTO>>(clientShipReservations, HttpStatus.OK);
    }

    @PutMapping("/shipReservation/cancelShipReservationByClient")
    public ResponseEntity<Boolean> cancelShipReservationByClient(@RequestBody ShipReservation shipReservation, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(shipReservationService.cancelShipReservationByClient(shipReservation), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
