package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.Complaint;
import com.izdajMe.izdajMe.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService{
    @Autowired
    private ComplaintRepository complaintRepository;

    public List<Complaint> getAllComplaints() {
        Iterable<Complaint> allComplaints = complaintRepository.findAll();
        ArrayList<Complaint> allComplaintsList = new ArrayList<>();
        allComplaints.forEach(allComplaintsList::add);

        return allComplaintsList;
    }
}
