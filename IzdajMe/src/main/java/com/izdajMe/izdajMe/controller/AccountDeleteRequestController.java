package com.izdajMe.izdajMe.controller;


import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.AccountDeleteRequestService;
import com.izdajMe.izdajMe.services.CottageService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AccountDeleteRequestController {
    @Autowired
    private AccountDeleteRequestService accountDeleteRequestService;

    @GetMapping("/accountDeleteRequest/getAllRequests")
    public ResponseEntity<List<AccountDeleteRequest>> getAllRequests() {
        List<AccountDeleteRequest> allRequests = new ArrayList<>();
        for (AccountDeleteRequest request : accountDeleteRequestService.getAllRequests()) {
            allRequests.add(request);
        }

        return new ResponseEntity<List<AccountDeleteRequest>>(allRequests, HttpStatus.OK);
    }

    @PostMapping("/accountDeleteRequest/addAccountDeleteRequest")
    public ResponseEntity<Boolean> addAccountDeleteRequest(@RequestBody AccountDeleteRequest accountDeleteRequest, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser || request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser
                    || request.getSession(false).getAttribute("role") == User.Role.instructor) {
                return new ResponseEntity<Boolean>(accountDeleteRequestService.addAccountDeleteRequest(accountDeleteRequest), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/accountDeleteRequest/acceptRequest")
    public ResponseEntity<Boolean> acceptRequest(@RequestBody AccountDeleteRequest accountDeleteRequest) {
        return new ResponseEntity<Boolean>(accountDeleteRequestService.acceptRequest(accountDeleteRequest), HttpStatus.OK);
    }

    @PostMapping("/accountDeleteRequest/declineRequest")
    public ResponseEntity<Boolean> declineRequest(@RequestBody AccountDeleteRequest accountDeleteRequest) {
        return new ResponseEntity<Boolean>(accountDeleteRequestService.declineRequest(accountDeleteRequest), HttpStatus.OK);
    }
}
