package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.CottageReservation;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountDeleteRequestService {
    public Boolean addAccountDeleteRequest(AccountDeleteRequest accountDeleteRequest);

    public List<AccountDeleteRequest> getAllRequests();

    public Boolean acceptRequest(AccountDeleteRequest accountDeleteRequest);

    public Boolean declineRequest(AccountDeleteRequest accountDeleteRequest);
}
