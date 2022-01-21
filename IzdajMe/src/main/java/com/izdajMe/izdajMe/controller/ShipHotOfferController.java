package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.HotOfferDTO;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.ShipHotOffer;
import com.izdajMe.izdajMe.services.ShipHotOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ShipHotOfferController {
    @Autowired
    private ShipHotOfferService shipHotOfferService;

    @GetMapping("/shipHotOffers/getAllShipHotOffers")
    public ResponseEntity<List<ShipHotOffer>> getAllFavorHotOffers() {
        List<ShipHotOffer> list = new ArrayList<ShipHotOffer>(shipHotOfferService.getAllShipHotOffers());

        return new ResponseEntity<List<ShipHotOffer>>(list, HttpStatus.OK);
    }

    @GetMapping("/shipHotOffers/getShipHotOffersByShipId")
    public ResponseEntity<List<ShipHotOffer>> getShipHotOffersByShipId(@RequestParam("shipId") Long shipId) {
        List<ShipHotOffer> list = new ArrayList<ShipHotOffer>(shipHotOfferService.getShipHotOffersByShipId(shipId));

        return new ResponseEntity<List<ShipHotOffer>>(list, HttpStatus.OK);
    }

    @GetMapping("/shipHotOffers/getAllShipHotOffersFromBaseFromTill")
    public ResponseEntity<List<ShipHotOffer>> getAllShipHotOffersFromBaseFromTill(@RequestParam("from") String from, @RequestParam("to") String to) {
        List<ShipHotOffer> hotOffers = new ArrayList<>(shipHotOfferService.getAllHotOffersFromBaseFromTill(from, to));

        return new ResponseEntity<List<ShipHotOffer>>(hotOffers, HttpStatus.OK);
    }

    @GetMapping("/shipHotOffers/getFutureShipHotOffersByShipId")
    public ResponseEntity<List<ShipHotOffer>> getFutureShipHotOffersByShipId(@RequestParam("shipId") Long shipId) {
        List<ShipHotOffer> list = new ArrayList<ShipHotOffer>(shipHotOfferService.getFutureShipHotOffersByShipId(shipId));

        return new ResponseEntity<List<ShipHotOffer>>(list, HttpStatus.OK);
    }
}
