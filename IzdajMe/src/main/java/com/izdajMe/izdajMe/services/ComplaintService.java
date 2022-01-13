package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Complaint;

import java.util.List;

public interface ComplaintService {
    public List<Complaint> getAllComplaints();
    public Boolean sendAnswer(Complaint complaint);
}
