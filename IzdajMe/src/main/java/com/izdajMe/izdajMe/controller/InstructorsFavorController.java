package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.InstructorsFavor;
import com.izdajMe.izdajMe.services.InstructorsFavorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class InstructorsFavorController {
    @Autowired
    private InstructorsFavorService instructorsFavorService;

    @GetMapping("/favors/getAllFavors")
    public ResponseEntity<List<InstructorsFavor>> getAllFavors(){
        List<InstructorsFavor> allFavors = new ArrayList<>();
        for(InstructorsFavor instructorsFavor : instructorsFavorService.getAllFavors()) {
            allFavors.add(instructorsFavor);
        }

        return new ResponseEntity<List<InstructorsFavor>>(allFavors, HttpStatus.OK);
    }

    @PostMapping("/favors/deleteFavor")
    public ResponseEntity<Boolean> deleteFavor(@RequestBody Long id){
        return new ResponseEntity<Boolean>(instructorsFavorService.deleteFavor(id), HttpStatus.OK);
    }
}
