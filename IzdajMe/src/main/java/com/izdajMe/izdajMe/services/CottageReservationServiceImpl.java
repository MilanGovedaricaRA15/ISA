package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.CottageReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CottageReservationServiceImpl implements CottageReservationService{
    @Autowired
    private CottageReservationRepository cottageReservationRepository;
    @Autowired
    private CottageRepository cottageRepository;
    @Autowired
    private EmailService emailService;

    public List<CottageReservation> getAllReservationsOfCottage(Long id) {
        List<CottageReservation> allThisCottageReservations = cottageReservationRepository.findAllByCottageId(id);
        return allThisCottageReservations;
    }

    public List<CottageReservation> getAllReservationsOfOwner(String email) {
        List<Cottage> ownerCottagesList = cottageRepository.findAllByCottageEmail(email);
        ArrayList<CottageReservation> allOwnerCottageReservations = new ArrayList<CottageReservation>();
        for(Cottage cottageOfOwner: ownerCottagesList){
            List<CottageReservation> list = cottageReservationRepository.findAllByCottageId(cottageOfOwner.getId());
                for (CottageReservation res : list){
                    allOwnerCottageReservations.add(res);
                }
        }
        return allOwnerCottageReservations;
    }

    public Boolean canAddReservation(List<CottageReservation> allThisCottageReservations, CottageReservation cottageReservation, List<HotOffer> hotOffers){
        boolean slobodno = true;
        for(CottageReservation cottageReservation1 : allThisCottageReservations) {
            if(cottageReservation.getAvailableFrom().isBefore(cottageReservation1.getAvailableFrom()) && cottageReservation.getAvailableTill().isAfter(cottageReservation1.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(cottageReservation.getAvailableFrom().isBefore(cottageReservation1.getAvailableTill()) && cottageReservation.getAvailableTill().isAfter(cottageReservation1.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(cottageReservation1.getAvailableFrom().isBefore(cottageReservation.getAvailableFrom()) && cottageReservation1.getAvailableTill().isAfter(cottageReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(cottageReservation1.getAvailableFrom().isEqual(cottageReservation.getAvailableFrom()) || cottageReservation1.getAvailableTill().isEqual(cottageReservation.getAvailableTill()) || cottageReservation1.getAvailableTill().isEqual(cottageReservation.getAvailableFrom()) || cottageReservation1.getAvailableFrom().isEqual(cottageReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
        }
        if(cottageReservation.getAvailableFrom().equals(cottageReservation.getAvailableTill())){
            slobodno = false;
        }
        if(cottageReservation.getAvailableFrom().isAfter(cottageReservation.getAvailableTill())) {
            slobodno = false;
        }

        for(HotOffer hotOffer : hotOffers) {
            if(cottageReservation.getAvailableFrom().isBefore(hotOffer.getAvailableFrom()) && cottageReservation.getAvailableTill().isAfter(hotOffer.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(cottageReservation.getAvailableFrom().isBefore(hotOffer.getAvailableTill()) && cottageReservation.getAvailableTill().isAfter(hotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer.getAvailableFrom().isBefore(cottageReservation.getAvailableFrom()) && hotOffer.getAvailableTill().isAfter(cottageReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer.getAvailableFrom().isEqual(cottageReservation.getAvailableFrom()) || hotOffer.getAvailableTill().isEqual(cottageReservation.getAvailableTill()) || hotOffer.getAvailableTill().isEqual(cottageReservation.getAvailableFrom()) || hotOffer.getAvailableFrom().isEqual(cottageReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
        }

        return  slobodno;
    }

    public Boolean addReservationByOwner(CottageReservation cottageReservation){

        List<CottageReservation> allThisCottageReservations = cottageReservationRepository.findAllByCottageId(cottageReservation.getCottage().getId());
        Cottage thisCottage = cottageRepository.getById(cottageReservation.getCottage().getId());
        List<HotOffer> allThisCottageHotOffers = thisCottage.getHotOffers();

        boolean slobodno = canAddReservation(allThisCottageReservations, cottageReservation, allThisCottageHotOffers);
        if(slobodno) {
            cottageReservationRepository.save(cottageReservation);
            sendNotificationForReservation(cottageReservation);
            return true;
        }
        else{
            return false;
        }
    }

    private void sendNotificationForReservation(CottageReservation cottageReservation) throws MailException{
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(cottageReservation.getClient().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Izdaj me new reservation");
        mail.setText("New reservation is made from: " + cottageReservation.getAvailableFrom() + " till: " + cottageReservation.getAvailableTill() + " in cottage: " + cottageReservation.getCottage().getName() + " by: " + cottageReservation.getCottage().getOwner().getFirstName());
        emailService.sendSimpleMessage(mail);
        return;
    }
}