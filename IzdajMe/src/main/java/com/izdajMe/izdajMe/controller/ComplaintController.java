package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.Complaint;
import com.izdajMe.izdajMe.services.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ComplaintController {
    @Autowired
    private ComplaintService complaintService;

    @GetMapping("/complaint/getAllComplaints")
    public ResponseEntity<List<Complaint>> getAllComplaints(){
        List<Complaint> allComplaints = new ArrayList<>();
        for(Complaint complaint : complaintService.getAllComplaints()) {
            allComplaints.add(complaint);
        }

        return new ResponseEntity<List<Complaint>>(allComplaints, HttpStatus.OK);
    }
}
