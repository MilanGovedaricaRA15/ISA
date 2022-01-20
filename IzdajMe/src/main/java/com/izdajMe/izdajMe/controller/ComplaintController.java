package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.CottageDTO;
import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.Complaint;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ComplaintController {
    @Autowired
    private ComplaintService complaintService;

    @GetMapping("/complaints/getAllComplaints")
    public ResponseEntity<List<Complaint>> getAllComplaints(){
        List<Complaint> allComplaints = new ArrayList<>();
        for(Complaint complaint : complaintService.getAllComplaints()) {
            allComplaints.add(complaint);
        }

        return new ResponseEntity<List<Complaint>>(allComplaints, HttpStatus.OK);
    }

    @PutMapping("/complaints/sendAnswer")
    public ResponseEntity<Boolean> sendAnswer(@RequestBody Complaint complaint) {
        return new ResponseEntity<Boolean>(complaintService.sendAnswer(complaint), HttpStatus.OK);
    }

    @PostMapping("/complaints/addComplaint")
    public ResponseEntity<Boolean> addComplaint(@RequestBody Complaint complaint, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(complaintService.addComplaint(complaint), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
