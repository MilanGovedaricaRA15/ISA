package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.FavorHotOffer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.izdajMe.izdajMe.services.FavorHotOfferService;
import com.izdajMe.izdajMe.model.User;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/favorHotOffers/getAllFavorHotOffers")
    public ResponseEntity<List<FavorHotOffer>> getAllFavorHotOffers() {
        List<FavorHotOffer> list = new ArrayList<FavorHotOffer>(favorHotOfferService.getAllFavorHotOffers());

        return new ResponseEntity<List<FavorHotOffer>>(list, HttpStatus.OK);
    }

    @GetMapping("/favorHotOffers/getFavorHotOffersByFavorId")
    public ResponseEntity<List<FavorHotOffer>> getFavorHotOffersByFavorId(@RequestParam("favorId") Long favorId) {
        List<FavorHotOffer> list = new ArrayList<FavorHotOffer>(favorHotOfferService.getFavorHotOffersByFavorId(favorId));

        return new ResponseEntity<List<FavorHotOffer>>(list, HttpStatus.OK);
    }

    @GetMapping("/favorHotOffers/getFutureFavorHotOffersByFavorId")
    public ResponseEntity<List<FavorHotOffer>> getFutureFavorHotOffersByFavorId(@RequestParam("favorId") Long favorId) {
        List<FavorHotOffer> list = new ArrayList<FavorHotOffer>(favorHotOfferService.getFutureFavorHotOffersByFavorId(favorId));

        return new ResponseEntity<List<FavorHotOffer>>(list, HttpStatus.OK);
    }
}
