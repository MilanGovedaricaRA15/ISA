package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Grade;

import java.util.List;

public interface GradeService {
    public List<Grade> getAllGrades();
    public Boolean acceptGrade(long id);
    public Boolean deleteGrade(long id);
}
