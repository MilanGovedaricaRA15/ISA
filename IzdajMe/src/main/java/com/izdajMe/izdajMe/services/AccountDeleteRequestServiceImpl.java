package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.ConcurentWatcher;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.AccountDeleteRequestRepository;
import com.izdajMe.izdajMe.repository.ConcurentWatcherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountDeleteRequestServiceImpl implements AccountDeleteRequestService {
    @Autowired
    private AccountDeleteRequestRepository accountDeleteRequestRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    private ConcurentWatcherRepository concurentWatcherRepository;

    public Boolean addAccountDeleteRequest(AccountDeleteRequest accountDeleteRequest) {
        List<AccountDeleteRequest> allNotSeenUserAccountDeleteRequestList = accountDeleteRequestRepository.findAllNotSeenByUserId(accountDeleteRequest.getUser().getId());
        if (allNotSeenUserAccountDeleteRequestList.size() != 0) {
            return false;
        } else {
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

    @Transactional(readOnly = false)
    public Boolean acceptRequest(AccountDeleteRequest accountDeleteRequest) {
        if(!concurentWatcherRepository.findByTableName("AnswerToDeclineRequest").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("AnswerToDeclineRequest");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            accountDeleteRequestRepository.deleteById(accountDeleteRequest.getId());
            sendNotificationForAcceptingRequest(accountDeleteRequest);
            cw.setWriting(false);
            concurentWatcherRepository.save(cw);
            return true;
        } else
            return false;
    }

    @Transactional(readOnly = false)
    public Boolean declineRequest(AccountDeleteRequest accountDeleteRequest) {
        if(!concurentWatcherRepository.findByTableName("AnswerToDeclineRequest").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("AnswerToDeclineRequest");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            sendNotificationForDecliningRequest(accountDeleteRequest);
            accountDeleteRequestRepository.deleteById(accountDeleteRequest.getId());
            cw.setWriting(false);
            concurentWatcherRepository.save(cw);

            return true;
        } else
            return false;
    }

    private void sendNotificationForAcceptingRequest(AccountDeleteRequest accountDeleteRequest) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(accountDeleteRequest.getUser().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Request accepted");
        mail.setText("Your request for deleting account has been accepted! Your account is deleted!");
        emailService.sendSimpleMessage(mail);
    }

    private void sendNotificationForDecliningRequest(AccountDeleteRequest accountDeleteRequest) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(accountDeleteRequest.getUser().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Request declined");
        mail.setText("Your request for deleting account has been declined!" + "\n" +
                "Reason: " + accountDeleteRequest.getReason() + "\n" +
                "Answer: " + accountDeleteRequest.getAnswer());
        emailService.sendSimpleMessage(mail);
    }
}
