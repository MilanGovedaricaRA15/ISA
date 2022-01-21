package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.InstructorsFavor;
import com.izdajMe.izdajMe.model.Report;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/reports/getAllReports")
    public ResponseEntity<List<Report>> getAllReports(){
        List<Report> allReports = new ArrayList<>();
        for(Report report : reportService.getAllReports()) {
            allReports.add(report);
        }

        return new ResponseEntity<List<Report>>(allReports, HttpStatus.OK);
    }

    @PutMapping("/reports/changeVerified")
    public ResponseEntity<Boolean> changeVerified(@RequestBody Long id) {
        return new ResponseEntity<Boolean>(reportService.changeVerified(id), HttpStatus.OK);
    }

    @PostMapping("/reports/deleteReport")
    public ResponseEntity<Boolean> deleteReport(@RequestBody Long id) {
        return new ResponseEntity<Boolean>(reportService.deleteReport(id), HttpStatus.OK);
    }
}
