package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.GradeRepository;
import com.izdajMe.izdajMe.repository.InstructorsFavorRepository;
import com.izdajMe.izdajMe.repository.ShipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GradeServiceImpl implements GradeService{
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private CottageRepository cottageRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private InstructorsFavorRepository instructorsFavorRepository;

    public List<Grade> getAllGrades() {
        Iterable<Grade> allGrades = gradeRepository.findAll();
        ArrayList<Grade> allGradesList = new ArrayList<>();
        allGrades.forEach(allGradesList::add);

        return allGradesList;
    }

    public Boolean acceptGrade(long id) {
        Grade grade = gradeRepository.findById(id).get();
        grade.setSeen(true);
        gradeRepository.save(grade);
        return true;
    }

    public Boolean deleteGrade(long id) {
        deleteFromCottageGrades(id);
        deleteFromShipGrades(id);
        gradeRepository.deleteById(id);
        return true;
    }

    private void deleteFromCottageGrades(long id) {
        List<Cottage> cottages = cottageRepository.findAll();
        for(Cottage c: cottages){
            List<Grade> checkedGrades = checkGrades(c.getGrades(), id);
            if(checkedGrades.size() != c.getGrades().size()) {
                c.setGrades(checkedGrades);
                cottageRepository.save(c);
            }
        }
    }

    private void deleteFromShipGrades(long id) {
        List<Ship> ships = shipRepository.findAll();
        for (Ship s : ships) {
            List<Grade> checkedGrades = checkGrades(s.getGrades(), id);
            if (checkedGrades.size() != s.getGrades().size()) {
                s.setGrades(checkedGrades);
                shipRepository.save(s);
            }
        }
    }

    private List<Grade> checkGrades(List<Grade> checkingGrades, long id){
        List<Grade> newGrades = new ArrayList<>();
        for(Grade g: checkingGrades) {
            if(g.getId() != id)
                newGrades.add(g);
        }

        return newGrades;
    }
}
