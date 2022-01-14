package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
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
            return false;
        }
    }

    public Boolean addHotOfferToFavor(InstructorsFavor favor){
        List<FavorHotOffer> hotOffers = favor.getHotOffers();
        InstructorsFavor favor1 = instructorsFavorRepository.findById(favor.getId()).get();
        List<FavorHotOffer> hotOffersWithout = favor1.getHotOffers();
        List<FavorReservation> allThisFavorReservations = favorReservationRepository.findAllByReservationId(favor.getId());

        FavorHotOffer addedHotOffer = new FavorHotOffer();
        boolean postoji = false;
        for (FavorHotOffer offer : hotOffers){
            postoji = false;
            for(FavorHotOffer offer1 : favor1.getHotOffers()){
                if (offer1.getId() == offer.getId()){
                    postoji = true;
                    break;
                }
            }
            if(!postoji){
                addedHotOffer = offer;
                break;
            }
        }
        boolean free = canAddHotOffer(hotOffersWithout,addedHotOffer,allThisFavorReservations);

        if(free){
            instructorsFavorRepository.save(favor);
        }
        return free;
    }

    public Boolean canAddHotOffer(List<FavorHotOffer> hotOffers,FavorHotOffer addedHotOffer, List<FavorReservation> favorReservations){
        boolean free = true;
        for(FavorHotOffer hotOffer1 : hotOffers) {
            if(addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableFrom())){
                free = false;
                break;
            }
            if(addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableTill())){
                free = false;
                break;
            }
            if(hotOffer1.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && hotOffer1.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())){
                free = false;
                break;
            }
            if(hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())){
                free = false;
                break;
            }
        }
        if(addedHotOffer.getAvailableFrom().equals(addedHotOffer.getAvailableTill())){
            free = false;
        }
        if(addedHotOffer.getAvailableFrom().isAfter(addedHotOffer.getAvailableTill())){
            free = false;
        }

        for(FavorReservation favorReservation : favorReservations) {
            if(addedHotOffer.getAvailableFrom().isBefore(favorReservation.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(favorReservation.getAvailableFrom())){
                free = false;
                break;
            }
            if(addedHotOffer.getAvailableFrom().isBefore(favorReservation.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(favorReservation.getAvailableTill())){
                free = false;
                break;
            }
            if(favorReservation.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && favorReservation.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())){
                free = false;
                break;
            }
            if(favorReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || favorReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || favorReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || favorReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())){
                free = false;
                break;
            }
        }

        return free;
    }

    public InstructorsFavor addFavor(InstructorsFavor favor){
        instructorsFavorRepository.save(favor);
        favor.setHotOffers(new ArrayList<FavorHotOffer>());
        favor.setImages(new ArrayList<String>());
        favor.setPriceList(new ArrayList<FavorServicePrice>());
        favor.setServices(new ArrayList<InstructorsFavor.FavorServices>());
        return favor;
    }

    public List<InstructorsFavor> getAllFavorsOfInstructor(String email) {
        List<InstructorsFavor> instructorFavors = instructorsFavorRepository.findAllByFavorEmail(email);
        return instructorFavors;
    }
}
