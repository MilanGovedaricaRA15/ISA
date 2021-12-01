package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.repository.AccountDeleteRequestRepository;
import com.izdajMe.izdajMe.repository.CottageReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AccountDeleteRequestServiceImpl implements AccountDeleteRequestService {
    @Autowired
    private AccountDeleteRequestRepository accountDeleteRequestRepository;

    public ResponseEntity<Boolean> addAccountDeleteRequest(AccountDeleteRequest accountDeleteRequest){
        Iterable<AccountDeleteRequest> allAccountDeleteRequest = accountDeleteRequestRepository.findAll();
        ArrayList<AccountDeleteRequest> allAccountDeleteRequestList = new ArrayList<AccountDeleteRequest>();
        allAccountDeleteRequest.forEach(allAccountDeleteRequestList::add);
        boolean postoji = false;
        for(AccountDeleteRequest request : allAccountDeleteRequestList){
            if (request.getUser().getId() == accountDeleteRequest.getUser().getId()){
                if(!request.isSeen()){
                    postoji = true;
                }
            }
        }
        if(!postoji){
            accountDeleteRequestRepository.save(accountDeleteRequest);
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
        }
    }
}
