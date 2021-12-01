package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
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

    public ResponseEntity<List<CottageReservation>> getAllReservationsOfCottage(Long id) {

        Iterable<CottageReservation> allCottageReservations = cottageReservationRepository.findAll();
        ArrayList<CottageReservation> allCottageReservationsList = new ArrayList<CottageReservation>();
        ArrayList<CottageReservation> allThisCottageReservations = new ArrayList<CottageReservation>();
        allCottageReservations.forEach(allCottageReservationsList::add);
        for(CottageReservation cottageReservation : allCottageReservationsList){
            if(cottageReservation.getCottage().getId() == id){
                allThisCottageReservations.add(cottageReservation);
            }
        }
        return new ResponseEntity<List<CottageReservation>>(allThisCottageReservations, HttpStatus.OK);
    }

    public ResponseEntity<List<CottageReservation>> getAllReservationsOfOwner(String email) {

        Iterable<Cottage> allCottages = cottageRepository.findAll();
        ArrayList<Cottage> allCottagesList = new ArrayList<Cottage>();
        ArrayList<Cottage> ownerCottagesList = new ArrayList<Cottage>();
        allCottages.forEach(allCottagesList::add);
        for(Cottage cottage : allCottagesList){
            if(cottage.getOwner().getEmail().equals(email)){
                ownerCottagesList.add(cottage);
            }
        }

        Iterable<CottageReservation> allCottageReservations = cottageReservationRepository.findAll();
        ArrayList<CottageReservation> allCottageReservationsList = new ArrayList<CottageReservation>();
        ArrayList<CottageReservation> allOwnerCottageReservations = new ArrayList<CottageReservation>();
        allCottageReservations.forEach(allCottageReservationsList::add);
        for(CottageReservation cottageReservation : allCottageReservationsList){
            for(Cottage cottageOfOwner: ownerCottagesList){
                if(cottageReservation.getCottage().getId() == cottageOfOwner.getId()){
                    allOwnerCottageReservations.add(cottageReservation);
                }
            }

        }
        return new ResponseEntity<List<CottageReservation>>(allOwnerCottageReservations, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> addReservationByOwner(CottageReservation cottageReservation){
        Iterable<CottageReservation> allCottageReservations = cottageReservationRepository.findAll();
        ArrayList<CottageReservation> allCottageReservationsList = new ArrayList<CottageReservation>();
        ArrayList<CottageReservation> allThisCottageReservations = new ArrayList<CottageReservation>();
        allCottageReservations.forEach(allCottageReservationsList::add);
        for(CottageReservation cottageReservation1 : allCottageReservationsList){
                if(cottageReservation1.getCottage().getId() == cottageReservation.getCottage().getId()) {
                    allThisCottageReservations.add(cottageReservation1);
                }
        }
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
        if(cottageReservation.getAvailableFrom().isAfter(cottageReservation.getAvailableTill())){
            slobodno = false;
        }



        if(slobodno) {
            cottageReservationRepository.save(cottageReservation);
            sendNotificationForReservation(cottageReservation);
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
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
