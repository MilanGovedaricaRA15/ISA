package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.InstructorsFavor;
import com.izdajMe.izdajMe.repository.InstructorsFavorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InstructorsFavorServiceImpl implements InstructorsFavorService{
    @Autowired
    private InstructorsFavorRepository instructorsFavorRepository;

    public List<InstructorsFavor> getAllFavors() {
        Iterable<InstructorsFavor> allFavors = instructorsFavorRepository.findAll();
        ArrayList<InstructorsFavor> allFavorsList = new ArrayList<InstructorsFavor>();
        allFavors.forEach(allFavorsList::add);

        return allFavorsList;
    }

    public Boolean deleteFavor(long id){
        instructorsFavorRepository.deleteById(id);
        return true;
    }
}
