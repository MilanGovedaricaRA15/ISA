package com.izdajMe.izdajMe.controller;


import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.AccountDeleteRequestService;
import com.izdajMe.izdajMe.services.CottageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AccountDeleteRequestController {
    @Autowired
    private AccountDeleteRequestService accountDeleteRequestService ;

    @PostMapping("/accountDeleteRequest/addAccountDeleteRequest")
    public ResponseEntity<Boolean> addAccountDeleteRequest(@RequestBody AccountDeleteRequest accountDeleteRequest,HttpServletRequest request){
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                return new ResponseEntity<Boolean>(accountDeleteRequestService.addAccountDeleteRequest(accountDeleteRequest), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
