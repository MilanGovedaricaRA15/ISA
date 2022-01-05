package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.InstructorsFavor;

import java.util.List;

public interface InstructorsFavorService {

    List<InstructorsFavor> getAllFavors();
    Boolean deleteFavor(long id);
}
