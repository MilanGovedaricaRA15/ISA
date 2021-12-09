package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.Ship;
import com.izdajMe.izdajMe.services.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ShipController {
    @Autowired
    private ShipService shipService;

    @GetMapping("/ships/getShipById")
    public ResponseEntity<Ship> getShipById(@RequestParam("ship") Long id) {
        Ship ship = shipService.getShipById(id);
        if (ship != null) {
            return new ResponseEntity<Ship>(ship, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Ship>(ship, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/ships/getAllShips")
    public ResponseEntity<List<Ship>> getAllShips(){
        List<Ship> allShips = new ArrayList<>();
        for(Ship ship : shipService.getAllShips()) {
            allShips.add(ship);
        }

        return new ResponseEntity<List<Ship>>(allShips, HttpStatus.OK);
    }

    @GetMapping("/ships/searchShipsByName")
    public ResponseEntity<List<Ship>> searchShipsByName(@RequestParam("name") String name) {
        return new ResponseEntity<List<Ship>>(shipService.searchShipsByName(name), HttpStatus.OK);
    }

    @GetMapping("/ships/getShipAverageGrade")
    public ResponseEntity<Float> getShipAverageGrade(@RequestParam("id") Long id) {
        return new ResponseEntity<Float>(shipService.getShipAverageGrade(id), HttpStatus.OK);
    }
}
