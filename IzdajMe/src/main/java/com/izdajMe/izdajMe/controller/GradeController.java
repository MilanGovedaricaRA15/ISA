package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.CottageDTO;
import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
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

    @PostMapping("/grades/addGradeToCottage")
    public ResponseEntity<Boolean> addGradeToCottage(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(gradeService.addGradeToCottage(cottage), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/grades/addGradeToShip")
    public ResponseEntity<Boolean> addGradeToShip(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(gradeService.addGradeToShip(ship), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/grades/addGradeToUser")
    public ResponseEntity<Boolean> addGradeToUser(@RequestBody User user, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(gradeService.addGradeToUser(user), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
