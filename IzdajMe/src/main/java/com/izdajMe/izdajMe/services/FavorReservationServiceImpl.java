package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.FavorReservation;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.InstructorsFavor;
import com.izdajMe.izdajMe.repository.FavorReservationRepository;
import com.izdajMe.izdajMe.repository.InstructorsFavorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FavorReservationServiceImpl implements FavorReservationService{

    @Autowired
    private FavorReservationRepository favorReservationRepository;
    @Autowired
    private InstructorsFavorRepository instructorsFavorRepository;

    @Override
    public List<FavorReservation> getAllReservations() {
        Iterable<FavorReservation> allReservations = favorReservationRepository.findAll();
        ArrayList<FavorReservation> allReservationsList = new ArrayList<FavorReservation>();
        allReservations.forEach(allReservationsList::add);

        return allReservationsList;
    }

    public FavorReservation getById(long id) {
        return favorReservationRepository.findById(id).get();
    }

    private List<FavorReservation> getReservationsById(long id) {
        List<FavorReservation> allReservations = favorReservationRepository.findAll();
        List<FavorReservation> reservationsById = new ArrayList<FavorReservation>();
        for(FavorReservation fr : allReservations ) {
            if(fr.getFavor().getId() == id)
                reservationsById.add(fr);
        }

        return reservationsById;
    }

    public Boolean addReservationByOwner(FavorReservation favorReservation){

        List<FavorReservation> allFavorReservations = getReservationsById(favorReservation.getFavor().getId());
        InstructorsFavor thisFavor = instructorsFavorRepository.getById(favorReservation.getFavor().getId());
        //List<HotOffer> allThisCottageHotOffers = thisCottage.getHotOffers();

        boolean slobodno = canAddReservation(allFavorReservations, favorReservation, new ArrayList<HotOffer>());
        if(slobodno) {
            favorReservationRepository.save(favorReservation);
            //sendNotificationForReservation(favorReservation);
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean canAddReservation(List<FavorReservation> allThisFavorReservations, FavorReservation favorReservation, List<HotOffer> hotOffers){
        boolean slobodno = true;
        for(FavorReservation favorReservation1 : allThisFavorReservations) {
            if(favorReservation.getAvailableFrom().isBefore(favorReservation1.getAvailableFrom()) && favorReservation.getAvailableTill().isAfter(favorReservation1.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(favorReservation.getAvailableFrom().isBefore(favorReservation1.getAvailableTill()) && favorReservation.getAvailableTill().isAfter(favorReservation1.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(favorReservation1.getAvailableFrom().isBefore(favorReservation.getAvailableFrom()) && favorReservation1.getAvailableTill().isAfter(favorReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(favorReservation1.getAvailableFrom().isEqual(favorReservation.getAvailableFrom()) || favorReservation1.getAvailableTill().isEqual(favorReservation.getAvailableTill()) || favorReservation1.getAvailableTill().isEqual(favorReservation.getAvailableFrom()) || favorReservation1.getAvailableFrom().isEqual(favorReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
        }
        if(favorReservation.getAvailableFrom().equals(favorReservation.getAvailableTill())){
            slobodno = false;
        }
        if(favorReservation.getAvailableFrom().isAfter(favorReservation.getAvailableTill())) {
            slobodno = false;
        }

        for(HotOffer hotOffer : hotOffers) {
            if(favorReservation.getAvailableFrom().isBefore(hotOffer.getAvailableFrom()) && favorReservation.getAvailableTill().isAfter(hotOffer.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(favorReservation.getAvailableFrom().isBefore(hotOffer.getAvailableTill()) && favorReservation.getAvailableTill().isAfter(hotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer.getAvailableFrom().isBefore(favorReservation.getAvailableFrom()) && hotOffer.getAvailableTill().isAfter(favorReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer.getAvailableFrom().isEqual(favorReservation.getAvailableFrom()) || hotOffer.getAvailableTill().isEqual(favorReservation.getAvailableTill()) || hotOffer.getAvailableTill().isEqual(favorReservation.getAvailableFrom()) || hotOffer.getAvailableFrom().isEqual(favorReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
        }

        return  slobodno;
    }

    public Boolean changeReservationByInstructor(FavorReservation favorReservation) {
        FavorReservation thisReservation = favorReservationRepository.getById(favorReservation.getId());
        if (thisReservation.getAvailableTill().isBefore(LocalDateTime.now())&&thisReservation.getReport()==null)
        {
            favorReservationRepository.save(favorReservation);
            return true;
        }
        else{
            return false;
        }
    }

    public void deleteByClientId(long id) {
        List<FavorReservation> reservations = favorReservationRepository.findAll();
        for(FavorReservation fr: reservations){
            if(fr.getClient().getId() == id)
                favorReservationRepository.deleteById(fr.getId());
        }
    }
}
