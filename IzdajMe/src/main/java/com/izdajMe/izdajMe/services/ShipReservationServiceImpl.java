package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.CottageReservationRepository;
import com.izdajMe.izdajMe.repository.ShipRepository;
import com.izdajMe.izdajMe.repository.ShipReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShipReservationServiceImpl implements ShipReservationService {
    @Autowired
    private ShipReservationRepository shipReservationRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private EmailService emailService;

    public List<ShipReservation> getAllReservationsOfShip(Long id) {
        List<ShipReservation> allThisShipReservations = shipReservationRepository.findAllByShipId(id);
        return allThisShipReservations;
    }

    public List<ShipReservation> getAllReservationsOfOwner(String email) {
        List<Ship> ownerShipList = shipRepository.findAllByShipEmail(email);
        ArrayList<ShipReservation> allOwnerShipReservations = new ArrayList<ShipReservation>();
        for(Ship shipOfOwner: ownerShipList){
            List<ShipReservation> list = shipReservationRepository.findAllByShipId(shipOfOwner.getId());
            for (ShipReservation res : list){
                allOwnerShipReservations.add(res);
            }
        }
        return allOwnerShipReservations;
    }

    public Boolean canAddReservation(List<ShipReservation> allThisShipReservations, ShipReservation shipReservation, List<ShipHotOffer> hotOffers){
        boolean slobodno = true;
        for(ShipReservation shipReservation1 : allThisShipReservations) {
            if(shipReservation.getAvailableFrom().isBefore(shipReservation1.getAvailableFrom()) && shipReservation.getAvailableTill().isAfter(shipReservation1.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(shipReservation.getAvailableFrom().isBefore(shipReservation1.getAvailableTill()) && shipReservation.getAvailableTill().isAfter(shipReservation1.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(shipReservation1.getAvailableFrom().isBefore(shipReservation.getAvailableFrom()) && shipReservation1.getAvailableTill().isAfter(shipReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(shipReservation1.getAvailableFrom().isEqual(shipReservation.getAvailableFrom()) || shipReservation1.getAvailableTill().isEqual(shipReservation.getAvailableTill()) || shipReservation1.getAvailableTill().isEqual(shipReservation.getAvailableFrom()) || shipReservation1.getAvailableFrom().isEqual(shipReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
        }
        if(shipReservation.getAvailableFrom().equals(shipReservation.getAvailableTill())){
            slobodno = false;
        }
        if(shipReservation.getAvailableFrom().isAfter(shipReservation.getAvailableTill())) {
            slobodno = false;
        }

        for(ShipHotOffer hotOffer : hotOffers) {
            if(shipReservation.getAvailableFrom().isBefore(hotOffer.getAvailableFrom()) && shipReservation.getAvailableTill().isAfter(hotOffer.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(shipReservation.getAvailableFrom().isBefore(hotOffer.getAvailableTill()) && shipReservation.getAvailableTill().isAfter(hotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer.getAvailableFrom().isBefore(shipReservation.getAvailableFrom()) && hotOffer.getAvailableTill().isAfter(shipReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer.getAvailableFrom().isEqual(shipReservation.getAvailableFrom()) || hotOffer.getAvailableTill().isEqual(shipReservation.getAvailableTill()) || hotOffer.getAvailableTill().isEqual(shipReservation.getAvailableFrom()) || hotOffer.getAvailableFrom().isEqual(shipReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
        }

        return  slobodno;
    }

    public Boolean addReservationByOwner(ShipReservation shipReservation){

        List<ShipReservation> allThisShipReservations = shipReservationRepository.findAllByShipId(shipReservation.getShip().getId());
        Ship thisShip = shipRepository.getById(shipReservation.getShip().getId());
        List<ShipHotOffer> allThisShipHotOffers = thisShip.getHotOffers();

        boolean slobodno = canAddReservation(allThisShipReservations, shipReservation, allThisShipHotOffers);
        if(slobodno) {
            shipReservationRepository.save(shipReservation);
            sendNotificationForReservation(shipReservation);
            return true;
        }
        else{
            return false;
        }
    }

    private void sendNotificationForReservation(ShipReservation shipReservation) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(shipReservation.getClient().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Izdaj me new reservation");
        mail.setText("New reservation is made from: " + shipReservation.getAvailableFrom() + " till: " + shipReservation.getAvailableTill() + " in ship: " + shipReservation.getShip().getName() + " by: " + shipReservation.getShip().getOwner().getFirstName());
        emailService.sendSimpleMessage(mail);
        return;
    }
}
