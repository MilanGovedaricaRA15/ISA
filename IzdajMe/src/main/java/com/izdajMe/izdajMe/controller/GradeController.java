package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.Complaint;
import com.izdajMe.izdajMe.model.Grade;
import com.izdajMe.izdajMe.services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class GradeController {
    @Autowired
    private GradeService gradeService;

    @GetMapping("/grades/getAllGrades")
    public ResponseEntity<List<Grade>> getAllGrades(){
        List<Grade> allGrades = new ArrayList<>();
        for(Grade grade : gradeService.getAllGrades()) {
            allGrades.add(grade);
        }

        return new ResponseEntity<List<Grade>>(allGrades, HttpStatus.OK);
    }

    @PostMapping("/grades/deleteGrade")
    public ResponseEntity<Boolean> deleteGrade(@RequestBody Long id){
        return new ResponseEntity<Boolean>(gradeService.deleteGrade(id), HttpStatus.OK);
    }

    @PostMapping("/grades/acceptGrade")
    public ResponseEntity<Boolean> acceptGrade(@RequestBody Long id) {
        return new ResponseEntity<Boolean>(gradeService.acceptGrade(id), HttpStatus.OK);
    }
}
