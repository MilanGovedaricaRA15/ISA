package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.Complaint;
import com.izdajMe.izdajMe.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    @Query("Select c from Complaint c where c.author.id=?1")
    public List<Complaint> findComplaintsByAuthorId(long id);
    @Query("Select c from Complaint c where c.complaintUser.id=?1")
    public List<Complaint> findComplaintsByComplaintUserId(long id);
}
