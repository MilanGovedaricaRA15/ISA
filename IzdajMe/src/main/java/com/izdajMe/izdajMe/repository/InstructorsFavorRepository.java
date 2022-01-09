package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.InstructorsFavor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstructorsFavorRepository extends JpaRepository<InstructorsFavor, Long> {
    @Query("Select f from InstructorsFavor f where f.instructor.id=?1")
    public List<InstructorsFavor> findInstructorFavorsById(long id);
    @Query("Select f from InstructorsFavor f where f.instructor.email=?1")
    public List<InstructorsFavor> findAllByFavorEmail(String email);
}
