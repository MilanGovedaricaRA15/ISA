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
import java.util.List;

@Service
public class AccountDeleteRequestServiceImpl implements AccountDeleteRequestService {
    @Autowired
    private AccountDeleteRequestRepository accountDeleteRequestRepository;

    public Boolean addAccountDeleteRequest(AccountDeleteRequest accountDeleteRequest){
        List<AccountDeleteRequest> allNotSeenUserAccountDeleteRequestList = accountDeleteRequestRepository.findAllNotSeenByUserId(accountDeleteRequest.getUser().getId());
        if(allNotSeenUserAccountDeleteRequestList.size() != 0){
            return false;
        }
        else {
            accountDeleteRequestRepository.save(accountDeleteRequest);
            return true;
        }
    }
}
