package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.repository.AccountDeleteRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<AccountDeleteRequest> getAllRequests() {
        Iterable<AccountDeleteRequest> allRequests = accountDeleteRequestRepository.findAll();
        ArrayList<AccountDeleteRequest> allRequestsList = new ArrayList<>();
        allRequests.forEach(allRequestsList::add);

        return allRequestsList;
    }

    public Boolean deleteRequest(long id) {
        accountDeleteRequestRepository.deleteById(id);
        return true;
    }
}
