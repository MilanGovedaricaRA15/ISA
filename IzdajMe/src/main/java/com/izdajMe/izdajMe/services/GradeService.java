package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.Grade;
import com.izdajMe.izdajMe.model.Ship;
import com.izdajMe.izdajMe.model.User;

import java.util.List;

public interface GradeService {
    public List<Grade> getAllGrades();
    public Boolean acceptGrade(long id);
    public Boolean deleteGrade(long id);
    public Boolean addGrade(Grade grade);
    public Boolean addGradeToCottage(Cottage cottage);
    public Boolean addGradeToShip(Ship ship);
    public Boolean addGradeToUser(User user);
}
