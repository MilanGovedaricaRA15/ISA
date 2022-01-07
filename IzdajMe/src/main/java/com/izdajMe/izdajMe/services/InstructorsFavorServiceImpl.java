package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.FavorReservation;
import com.izdajMe.izdajMe.model.InstructorsFavor;
import com.izdajMe.izdajMe.repository.FavorReservationRepository;
import com.izdajMe.izdajMe.repository.InstructorsFavorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class InstructorsFavorServiceImpl implements InstructorsFavorService{
    @Autowired
    private InstructorsFavorRepository instructorsFavorRepository;
    @Autowired
    private FavorReservationRepository favorReservationRepository;

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

    public InstructorsFavor getFavorById(long id) {
        return instructorsFavorRepository.findById(id).get();
    }

    public Boolean checkIsReserved(InstructorsFavor favor){
        if(!isReserved(favor.getId())) {
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean changeFavor(InstructorsFavor favor){
        if(!isReserved(favor.getId())) {
            instructorsFavorRepository.save(favor);
            return true;
        }
        else{
            return false;
        }
    }

    public boolean isReserved(Long id){
        List<FavorReservation> allFavorReservationsList = favorReservationRepository.findAllByReservationId(id);
        for(FavorReservation favorReservation : allFavorReservationsList){
            if(LocalDateTime.now().isBefore(favorReservation.getAvailableTill())){
                return true;
            }
        }
        return false;
    }

    public Boolean removeFavorImg(InstructorsFavor favor) {
        if(!isReserved(favor.getId())) {
            instructorsFavorRepository.save(favor);
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean uploadImg(MultipartFile file){

        String orgName = file.getOriginalFilename();

        String filePath = "../front/src/assets/images/" + orgName +".jpg";
        File dest = new File(filePath);
        if(!dest.exists())
        {

        }
        try {
            file.transferTo(Paths.get(filePath));
            return true;
        }
        catch (IllegalStateException | IOException e)
        {
            e.printStackTrace();
            return false;
        }
    }
}
