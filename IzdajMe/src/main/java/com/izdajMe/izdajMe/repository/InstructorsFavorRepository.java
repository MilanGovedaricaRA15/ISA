package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.InstructorsFavor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstructorsFavorRepository extends JpaRepository<InstructorsFavor, Long> {
    @Query("Select c from Cottage c where c.owner.id=?1")
    public List<InstructorsFavor> findCottagesById(long id);
}
