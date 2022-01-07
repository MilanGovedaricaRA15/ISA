package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.InstructorsFavor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface InstructorsFavorService {

    public List<InstructorsFavor> getAllFavors();
    public Boolean deleteFavor(long id);
    public InstructorsFavor getFavorById(long id);
    public Boolean checkIsReserved(InstructorsFavor favor);
    public Boolean changeFavor(InstructorsFavor favor);
    public boolean isReserved(Long id);
    public Boolean removeFavorImg(InstructorsFavor favor);
    public Boolean uploadImg( MultipartFile file);
}
