package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.CottageReservation;
import org.springframework.http.ResponseEntity;

public interface AccountDeleteRequestService {
    public Boolean addAccountDeleteRequest(AccountDeleteRequest accountDeleteRequest);
}
