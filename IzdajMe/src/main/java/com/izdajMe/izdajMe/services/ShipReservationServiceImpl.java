package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    @Autowired
    private ConcurentWatcherRepository concurentWatcherRepository;
    @Autowired
    private UserRepository userRepository;

    public List<ShipReservation> getAllReservationsOfShip(Long id) {
        List<ShipReservation> allThisShipReservations = shipReservationRepository.findAllByShipId(id);
        return allThisShipReservations;
    }

    public List<ShipReservation> getAllReservations() {
        Iterable<ShipReservation> allReservations = shipReservationRepository.findAll();
        ArrayList<ShipReservation> allReservationsList = new ArrayList<ShipReservation>();
        allReservations.forEach(allReservationsList::add);

        return allReservationsList;
    }

    public ShipReservation getById(Long id) {
        return shipReservationRepository.findById(id).get();
    }

    public List<ShipReservation> getAllReservationsFromBaseFromTill(String from, String to) {
        Timestamp fromDateTs = new Timestamp(Long.parseLong(from));
        Timestamp toDateTs = new Timestamp(Long.parseLong(to));
        LocalDateTime fromDate = fromDateTs.toLocalDateTime();
        LocalDateTime toDate = toDateTs.toLocalDateTime();


        List<ShipReservation> allShipReservations = shipReservationRepository.findAllFromBaseFromTill(fromDate, toDate);
        return allShipReservations;
    }

    public Boolean changeReservationByOwner(ShipReservation shipReservation) {
        ShipReservation thisReservation = shipReservationRepository.getById(shipReservation.getId());
        if (thisReservation.getAvailableTill().isBefore(LocalDateTime.now()) && thisReservation.getReport() == null && thisReservation.getPenalty() == null) {
            if(!shipReservation.getReport().getShowedUp()) {
                User client = userRepository.findById(shipReservation.getClient().getId()).get();
                client.setPoints(client.getPoints() - 60);
                if(client.getPoints() >= 300 && client.getPoints() < 600)
                    client.setType(User.Type.Silver);
                else if(client.getPoints() < 300)
                    client.setType(User.Type.Regular);

                userRepository.save(client);
            }
            shipReservationRepository.save(shipReservation);
            return true;
        } else {
            return false;
        }
    }

    public List<ShipReservation> getAllReservationsOfShipFromTill(Long id, String from, String to) {
        Timestamp fromDateTs = new Timestamp(Long.parseLong(from));
        Timestamp toDateTs = new Timestamp(Long.parseLong(to));
        LocalDateTime fromDate = fromDateTs.toLocalDateTime();
        LocalDateTime toDate = toDateTs.toLocalDateTime();


        List<ShipReservation> allThisShipReservations = shipReservationRepository.findAllByShipIdFromTill(id, fromDate, toDate);
        return allThisShipReservations;
    }

    public List<ShipReservation> getAllReservationsOfOwner(String email) {
        List<Ship> ownerShipList = shipRepository.findAllByShipEmail(email);
        ArrayList<ShipReservation> allOwnerShipReservations = new ArrayList<ShipReservation>();
        for (Ship shipOfOwner : ownerShipList) {
            List<ShipReservation> list = shipReservationRepository.findAllByShipId(shipOfOwner.getId());
            for (ShipReservation res : list) {
                allOwnerShipReservations.add(res);
            }
        }
        return allOwnerShipReservations;
    }

    public Boolean canAddReservation(List<ShipReservation> allThisShipReservations, ShipReservation shipReservation, List<ShipHotOffer> hotOffers) {
        boolean slobodno = true;
        for (ShipReservation shipReservation1 : allThisShipReservations) {
            if (shipReservation.getAvailableFrom().isBefore(shipReservation1.getAvailableFrom()) && shipReservation.getAvailableTill().isAfter(shipReservation1.getAvailableFrom())) {
                slobodno = false;
                break;
            }
            if (shipReservation.getAvailableFrom().isBefore(shipReservation1.getAvailableTill()) && shipReservation.getAvailableTill().isAfter(shipReservation1.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (shipReservation1.getAvailableFrom().isBefore(shipReservation.getAvailableFrom()) && shipReservation1.getAvailableTill().isAfter(shipReservation.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (shipReservation1.getAvailableFrom().isEqual(shipReservation.getAvailableFrom()) || shipReservation1.getAvailableTill().isEqual(shipReservation.getAvailableTill()) || shipReservation1.getAvailableTill().isEqual(shipReservation.getAvailableFrom()) || shipReservation1.getAvailableFrom().isEqual(shipReservation.getAvailableTill())) {
                slobodno = false;
                break;
            }
        }
        if (shipReservation.getAvailableFrom().equals(shipReservation.getAvailableTill())) {
            slobodno = false;
        }
        if (shipReservation.getAvailableFrom().isAfter(shipReservation.getAvailableTill())) {
            slobodno = false;
        }

        for (ShipHotOffer hotOffer : hotOffers) {
            if (shipReservation.getAvailableFrom().isBefore(hotOffer.getAvailableFrom()) && shipReservation.getAvailableTill().isAfter(hotOffer.getAvailableFrom())) {
                slobodno = false;
                break;
            }
            if (shipReservation.getAvailableFrom().isBefore(hotOffer.getAvailableTill()) && shipReservation.getAvailableTill().isAfter(hotOffer.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (hotOffer.getAvailableFrom().isBefore(shipReservation.getAvailableFrom()) && hotOffer.getAvailableTill().isAfter(shipReservation.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (hotOffer.getAvailableFrom().isEqual(shipReservation.getAvailableFrom()) || hotOffer.getAvailableTill().isEqual(shipReservation.getAvailableTill()) || hotOffer.getAvailableTill().isEqual(shipReservation.getAvailableFrom()) || hotOffer.getAvailableFrom().isEqual(shipReservation.getAvailableTill())) {
                slobodno = false;
                break;
            }
        }

        return slobodno;
    }

    @Transactional(readOnly = false)
    public Boolean addReservationByOwner(ShipReservation shipReservation) {
        if (!concurentWatcherRepository.findByTableName("ShipReservation").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("ShipReservation");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            List<ShipReservation> allThisShipReservations = shipReservationRepository.findAllByShipId(shipReservation.getShip().getId());
            Ship thisShip = shipRepository.getById(shipReservation.getShip().getId());
            List<ShipHotOffer> allThisShipHotOffers = thisShip.getHotOffers();

            boolean slobodno = canAddReservation(allThisShipReservations, shipReservation, allThisShipHotOffers);
            if (slobodno) {
                addPointsToShipOwner(shipReservation);
                addPointsToClient(shipReservation);
                if(shipReservation.getClient().getType() == User.Type.Gold)
                    shipReservation.setCost(shipReservation.getCost() * 80 / 100);
                else if(shipReservation.getClient().getType() == User.Type.Silver)
                    shipReservation.setCost(shipReservation.getCost() * 90 / 100);

                shipReservationRepository.save(shipReservation);
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                sendNotificationForReservation(shipReservation);
                return true;
            } else {
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                return false;
            }
        } else {
            return false;
        }
    }

    private void addPointsToShipOwner(ShipReservation shipReservation){
        User user = shipReservation.getShip().getOwner();
        if(user.getType() == User.Type.Gold)
            user.setPoints(user.getPoints() + 6);
        else if(user.getType() == User.Type.Silver){
            user.setPoints(user.getPoints() + 4);
            if(user.getPoints() > 600)
                user.setType(User.Type.Gold);
        }
        else {
            user.setPoints(user.getPoints() + 2);
            if(user.getPoints() > 300)
                user.setType(User.Type.Silver);
        }
        userRepository.save(user);
    }

    @Transactional(readOnly = false)
    public Boolean addReservationByClient(ShipReservation shipReservation){
        if (!concurentWatcherRepository.findByTableName("ShipReservation").getWriting()
                && !concurentWatcherRepository.findByTableName("Ship").getWriting()
                && !concurentWatcherRepository.findByTableName("ShipHotOffer").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("ShipReservation");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            List<ShipReservation> allThisShipReservations = shipReservationRepository.findAllByShipId(shipReservation.getShip().getId());
            Ship thisShip = shipRepository.getById(shipReservation.getShip().getId());
            List<ShipHotOffer> allThisShipHotOffers = thisShip.getHotOffers();

            if (canAddReservation(allThisShipReservations, shipReservation, allThisShipHotOffers)) {
                addPointsToShipOwner(shipReservation);
                addPointsToClient(shipReservation);
                if(shipReservation.getClient().getType() == User.Type.Gold)
                    shipReservation.setCost(shipReservation.getCost() * 80 / 100);
                else if(shipReservation.getClient().getType() == User.Type.Silver)
                    shipReservation.setCost(shipReservation.getCost() * 90 / 100);

                shipReservationRepository.save(shipReservation);
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                sendNotificationForClientReservation(shipReservation);
                return true;
            } else {
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                return false;
            }
        }
        else{
            return false;
        }
    }

    private void addPointsToClient(ShipReservation shipReservation){
        User user = shipReservation.getClient();
        if(user.getType() == User.Type.Gold)
            user.setPoints(user.getPoints() + 6);
        else if(user.getType() == User.Type.Silver){
            user.setPoints(user.getPoints() + 4);
            if(user.getPoints() > 600)
                user.setType(User.Type.Gold);
        }
        else {
            user.setPoints(user.getPoints() + 2);
            if(user.getPoints() > 300)
                user.setType(User.Type.Silver);
        }
        userRepository.save(user);
    }

    @Transactional(readOnly = false)
    public Boolean addShipHotOfferReservationByClient(ShipReservation shipReservation) {
        if (!concurentWatcherRepository.findByTableName("ShipReservation").getWriting()
                && !concurentWatcherRepository.findByTableName("Ship").getWriting()
                && !concurentWatcherRepository.findByTableName("ShipHotOffer").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("ShipReservation");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            List<ShipReservation> allThisShipReservations = shipReservationRepository.findAllByShipId(shipReservation.getShip().getId());

            if(canAddReservation(allThisShipReservations, shipReservation, new ArrayList<ShipHotOffer>())) {
                addPointsToShipOwner(shipReservation);
                addPointsToClient(shipReservation);
                if(shipReservation.getClient().getType() == User.Type.Gold)
                    shipReservation.setCost(shipReservation.getCost() * 80 / 100);
                else if(shipReservation.getClient().getType() == User.Type.Silver)
                    shipReservation.setCost(shipReservation.getCost() * 90 / 100);

                shipReservationRepository.save(shipReservation);
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                sendNotificationForClientReservation(shipReservation);
                return true;
            }
            else {
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                return false;
            }
        } else {
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

    private void sendNotificationForClientReservation(ShipReservation shipReservation) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(shipReservation.getClient().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("IzdajMe new reservation");
        mail.setText("New reservation is made from: " + shipReservation.getAvailableFrom() + " till: " + shipReservation.getAvailableTill() + " in ship: " + shipReservation.getShip().getName() + " by: " + shipReservation.getClient().getFirstName());
        emailService.sendSimpleMessage(mail);
	}

    public void deleteByClientId(long id) {
        List<ShipReservation> reservations = shipReservationRepository.findAll();
        for (ShipReservation sr : reservations) {
            if (sr.getClient().getId() == id)
                shipReservationRepository.deleteById(sr.getId());
        }
    }

    public List<ShipReservation> getShipReservationsOfClient(String email) {
        return shipReservationRepository.findAllByClientEmail(email);
    }

    public Boolean cancelShipReservationByClient(ShipReservation shipReservation) {
        if (shipReservationRepository.existsById(shipReservation.getId())) {
            shipReservationRepository.deleteById(shipReservation.getId());
            return true;
        }

        return false;
    }
}
