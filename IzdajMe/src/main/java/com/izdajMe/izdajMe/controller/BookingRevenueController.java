package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.BookingRevenue;
import com.izdajMe.izdajMe.model.Grade;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.BookingRevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BookingRevenueController {
    @Autowired
    private BookingRevenueService bookingRevenueService;

    @GetMapping("/bookingRevenue/getRevenues")
    public ResponseEntity<BookingRevenue> getRevenues() {
        return new ResponseEntity<BookingRevenue>(bookingRevenueService.getRevenues(), HttpStatus.OK);
    }

    @PutMapping("/bookingRevenue/changeRevenues")
    public ResponseEntity<Boolean> changeRevenues(@RequestBody String revenues) {
        int revenueRegular = Integer.parseInt(revenues.split(" ")[0]);
        int revenueSilver = Integer.parseInt(revenues.split(" ")[1]);
        int revenueGold = Integer.parseInt(revenues.split(" ")[2]);
        return new ResponseEntity<Boolean>(bookingRevenueService.changeRevenue(revenueRegular, revenueSilver, revenueGold), HttpStatus.OK);
    }
}
