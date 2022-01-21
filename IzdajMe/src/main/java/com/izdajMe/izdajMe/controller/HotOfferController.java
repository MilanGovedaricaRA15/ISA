package com.izdajMe.izdajMe.controller;


import com.izdajMe.izdajMe.dto.HotOfferDTO;
import com.izdajMe.izdajMe.dto.ShipReservationDTO;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.ShipReservation;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.HotOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HotOfferController {
    @Autowired
    private HotOfferService hotOfferService;

    @PostMapping("/hotOffers/saveHotOffer")
    public ResponseEntity<Void> saveHotOffer(@RequestBody HotOffer hotOffer, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                if (hotOfferService.saveHotOffer(hotOffer)) {
                    return ResponseEntity.ok(null);
                } else {
                    return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/hotOffers/removeHotOffer")
    public ResponseEntity<Boolean> removeHotOffer(@RequestBody Long id, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                return new ResponseEntity<Boolean>(hotOfferService.removeHotOffer(id), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/hotOffers/getAllHotOffersFromBaseFromTill")
    public ResponseEntity<List<HotOffer>> getAllHotOffersFromBaseFromTill(@RequestParam("from") String from, @RequestParam("to") String to) {

        List<HotOffer> reservations = new ArrayList<>(hotOfferService.getAllHotOffersFromBaseFromTill(from, to));

        return new ResponseEntity<List<HotOffer>>(reservations, HttpStatus.OK);
    }

    @GetMapping("/hotOffers/getAllHotOffers")
    public ResponseEntity<List<HotOfferDTO>> getAllHotOffers() {
        List<HotOfferDTO> list = new ArrayList<HotOfferDTO>();
        for (HotOffer ho : hotOfferService.getAllHotOffers()) {
            list.add(new HotOfferDTO(ho));
        }

        return new ResponseEntity<List<HotOfferDTO>>(list, HttpStatus.OK);
    }

    @GetMapping("/hotOffers/getHotOffersByCottageId")
    public ResponseEntity<List<HotOfferDTO>> getHotOffersByCottageId(@RequestParam("cottageId") Long cottageId) {
        List<HotOfferDTO> list = new ArrayList<HotOfferDTO>();
        for (HotOffer ho : hotOfferService.getHotOffersByCottageId(cottageId)) {
            list.add(new HotOfferDTO(ho));
        }

        return new ResponseEntity<List<HotOfferDTO>>(list, HttpStatus.OK);
    }

    @GetMapping("/hotOffers/getFutureHotOffersByCottageId")
    public ResponseEntity<List<HotOfferDTO>> getFutureHotOffersByCottageId(@RequestParam("cottageId") Long cottageId) {
        List<HotOfferDTO> list = new ArrayList<HotOfferDTO>();
        for (HotOffer ho : hotOfferService.getFutureHotOffersByCottageId(cottageId)) {
            list.add(new HotOfferDTO(ho));
        }

        return new ResponseEntity<List<HotOfferDTO>>(list, HttpStatus.OK);
    }
}
