package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.InstructorsFavor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorsFavorRepository extends JpaRepository<InstructorsFavor, Long> {
}
