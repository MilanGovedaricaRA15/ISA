package com.izdajMe.izdajMe.controller;


import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.services.CottageService;
import com.izdajMe.izdajMe.services.HotOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HotOfferController {
    @Autowired
    private HotOfferService hotOfferService ;

    @PostMapping("/hotOffers/saveHotOffer")
    public ResponseEntity<Void> saveHotOffer(@RequestBody HotOffer hotOffer){
        if(hotOfferService.saveHotOffer(hotOffer)){
            return ResponseEntity.ok(null);
        }
        else {
           return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @PostMapping("/hotOffers/removeHotOffer")
    public ResponseEntity<Boolean> removeHotOffer(@RequestBody Long id){
        return new ResponseEntity<Boolean>(hotOfferService.removeHotOffer(id), HttpStatus.OK);
    }
}
