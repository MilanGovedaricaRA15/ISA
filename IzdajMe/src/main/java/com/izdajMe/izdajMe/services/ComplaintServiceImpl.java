package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.Complaint;
import com.izdajMe.izdajMe.model.ConcurentWatcher;
import com.izdajMe.izdajMe.repository.ComplaintRepository;
import com.izdajMe.izdajMe.repository.ConcurentWatcherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService{
    @Autowired
    private ComplaintRepository complaintRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private ConcurentWatcherRepository concurentWatcherRepository;

    public List<Complaint> getAllComplaints() {
        Iterable<Complaint> allComplaints = complaintRepository.findAll();
        ArrayList<Complaint> allComplaintsList = new ArrayList<>();
        allComplaints.forEach(allComplaintsList::add);

        return allComplaintsList;
    }

    @Transactional(readOnly = false)
    public Boolean sendAnswer(Complaint complaint) {
        if(!concurentWatcherRepository.findByTableName("AnswerToComplaint").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("AnswerToComplaint");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            sendNotificationToAuthor(complaint);
            sendNotificationToComplaintUser(complaint);
            complaintRepository.deleteById(complaint.getId());
            cw.setWriting(false);
            concurentWatcherRepository.save(cw);

            return true;
        } else
            return false;
    }

    @Override
    public Boolean addComplaint(Complaint complaint) {
        complaintRepository.save(complaint);
        return true;
    }

    private void sendNotificationToAuthor(Complaint complaint) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(complaint.getAuthor().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Answer on your complaint");
        mail.setText("Answer: " + complaint.getAnswer());
        emailService.sendSimpleMessage(mail);
    }

    private void sendNotificationToComplaintUser(Complaint complaint) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(complaint.getComplaintUser().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Answer on complaint");
        mail.setText("Complaint by: " + complaint.getAuthor().getFirstName() + " " + complaint.getAuthor().getLastName() + "\n"
            + "Text: " + complaint.getText() + "\n" + "Answer: " + complaint.getAnswer());
        emailService.sendSimpleMessage(mail);
    }
}
