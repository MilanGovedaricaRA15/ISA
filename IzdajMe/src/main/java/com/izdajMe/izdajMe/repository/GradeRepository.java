package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
}
