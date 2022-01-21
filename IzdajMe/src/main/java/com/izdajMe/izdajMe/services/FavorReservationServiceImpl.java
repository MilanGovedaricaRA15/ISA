package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.FavorReservationRepository;
import com.izdajMe.izdajMe.repository.InstructorsFavorRepository;
import com.izdajMe.izdajMe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FavorReservationServiceImpl implements FavorReservationService{

    @Autowired
    private FavorReservationRepository favorReservationRepository;
    @Autowired
    private InstructorsFavorRepository instructorsFavorRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserRepository userRepository;

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

    public List<FavorReservation> getAllReservationsOfFavor(Long id) {
        return favorReservationRepository.findAllByFavorId(id);
    }

    public List<FavorReservation> getAllReservationsOfFavorFromTill(Long id, String from, String to) {
        Timestamp fromDateTs = new Timestamp(Long.parseLong(from));
        Timestamp toDateTs = new Timestamp(Long.parseLong(to));
        LocalDateTime fromDate = fromDateTs.toLocalDateTime();
        LocalDateTime toDate = toDateTs.toLocalDateTime();


        List<FavorReservation> allFavorReservations = favorReservationRepository.findAllByFavorIdFromTill(id, fromDate, toDate);
        return allFavorReservations;
    }

    public List<FavorReservation> getAllReservationsFromBaseFromTill(String from, String to) {
        Timestamp fromDateTs = new Timestamp(Long.parseLong(from));
        Timestamp toDateTs = new Timestamp(Long.parseLong(to));
        LocalDateTime fromDate = fromDateTs.toLocalDateTime();
        LocalDateTime toDate = toDateTs.toLocalDateTime();


        List<FavorReservation> allFavorReservations = favorReservationRepository.findAllFromBaseFromTill(fromDate, toDate);
        return allFavorReservations;
    }

    public List<FavorReservation> getAllReservationsFromTill(Long id, String from, String to) {
        Timestamp fromDateTs = new Timestamp(Long.parseLong(from));
        Timestamp toDateTs = new Timestamp(Long.parseLong(to));
        LocalDateTime fromDate = fromDateTs.toLocalDateTime();
        LocalDateTime toDate = toDateTs.toLocalDateTime();


        List<FavorReservation> allFavorReservations = favorReservationRepository.findAllFromTill(id, fromDate, toDate);
        return allFavorReservations;
    }

    public Boolean addReservationByOwner(FavorReservation favorReservation){
        List<FavorReservation> allFavorReservations = getReservationsById(favorReservation.getFavor().getId());
        InstructorsFavor favor = instructorsFavorRepository.findById(favorReservation.getFavor().getId()).get();
        List<FavorHotOffer> hotOffers = favor.getHotOffers();

        boolean free = canAddReservation(allFavorReservations, favorReservation, hotOffers);

        if(free) {
            addPointsToInstructor(favorReservation);
            addPointsToClient(favorReservation);
            if(favorReservation.getClient().getType() == User.Type.Gold)
                favorReservation.setCost(favorReservation.getCost() * 80 / 100);
            else if(favorReservation.getClient().getType() == User.Type.Silver)
                favorReservation.setCost(favorReservation.getCost() * 90 / 100);
            
            favorReservationRepository.save(favorReservation);
            sendNotificationForReservation(favorReservation);
            return true;
        }
        else{
            return false;
        }
    }

    private void addPointsToInstructor(FavorReservation favorReservation){
        User user = favorReservation.getFavor().getInstructor();
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

    public Boolean addReservationByClient(FavorReservation favorReservation) {
        List<FavorReservation> allFavorReservations = getReservationsById(favorReservation.getFavor().getId());
        InstructorsFavor thisFavor = instructorsFavorRepository.getById(favorReservation.getFavor().getId());
        List<FavorHotOffer> allThisFavorHotOffers = thisFavor.getHotOffers();

        if(canAddReservation(allFavorReservations, favorReservation, allThisFavorHotOffers)) {
            addPointsToInstructor(favorReservation);
            addPointsToClient(favorReservation);
            if(favorReservation.getClient().getType() == User.Type.Gold)
                favorReservation.setCost(favorReservation.getCost() * 80 / 100);
            else if(favorReservation.getClient().getType() == User.Type.Silver)
                favorReservation.setCost(favorReservation.getCost() * 90 / 100);

            favorReservationRepository.save(favorReservation);
            sendNotificationForClientReservation(favorReservation);
            return true;
        }
        else {
            return false;
        }
    }

    private void addPointsToClient(FavorReservation favorReservation){
        User user = favorReservation.getClient();
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

    public Boolean addFavorHotOfferReservationByClient(FavorReservation favorReservation) {
        List<FavorReservation> allFavorReservations = getReservationsById(favorReservation.getFavor().getId());

        if(canAddReservation(allFavorReservations, favorReservation, new ArrayList<FavorHotOffer>())) {
            addPointsToInstructor(favorReservation);
            addPointsToClient(favorReservation);
            if(favorReservation.getClient().getType() == User.Type.Gold)
                favorReservation.setCost(favorReservation.getCost() * 80 / 100);
            else if(favorReservation.getClient().getType() == User.Type.Silver)
                favorReservation.setCost(favorReservation.getCost() * 90 / 100);

            favorReservationRepository.save(favorReservation);
            sendNotificationForClientReservation(favorReservation);
            return true;
        }
        else {
            return false;
        }
    }
	
    public Boolean canAddReservation(List<FavorReservation> allThisFavorReservations, FavorReservation favorReservation, List<FavorHotOffer> hotOffers){
        boolean free = true;
        for(FavorReservation favorReservation1 : allThisFavorReservations) {
            if(favorReservation.getAvailableFrom().isBefore(favorReservation1.getAvailableFrom()) && favorReservation.getAvailableTill().isAfter(favorReservation1.getAvailableFrom())){
                free = false;
                break;
            }
            if(favorReservation.getAvailableFrom().isBefore(favorReservation1.getAvailableTill()) && favorReservation.getAvailableTill().isAfter(favorReservation1.getAvailableTill())){
                free = false;
                break;
            }
            if(favorReservation1.getAvailableFrom().isBefore(favorReservation.getAvailableFrom()) && favorReservation1.getAvailableTill().isAfter(favorReservation.getAvailableTill())){
                free = false;
                break;
            }
            if(favorReservation1.getAvailableFrom().isEqual(favorReservation.getAvailableFrom()) || favorReservation1.getAvailableTill().isEqual(favorReservation.getAvailableTill()) || favorReservation1.getAvailableTill().isEqual(favorReservation.getAvailableFrom()) || favorReservation1.getAvailableFrom().isEqual(favorReservation.getAvailableTill())){
                free = false;
                break;
            }
        }
        if(favorReservation.getAvailableFrom().equals(favorReservation.getAvailableTill())){
            free = false;
        }
        if(favorReservation.getAvailableFrom().isAfter(favorReservation.getAvailableTill())) {
            free = false;
        }

        for(FavorHotOffer hotOffer : hotOffers) {
            if(favorReservation.getAvailableFrom().isBefore(hotOffer.getAvailableFrom()) && favorReservation.getAvailableTill().isAfter(hotOffer.getAvailableFrom())){
                free = false;
                break;
            }
            if(favorReservation.getAvailableFrom().isBefore(hotOffer.getAvailableTill()) && favorReservation.getAvailableTill().isAfter(hotOffer.getAvailableTill())){
                free = false;
                break;
            }
            if(hotOffer.getAvailableFrom().isBefore(favorReservation.getAvailableFrom()) && hotOffer.getAvailableTill().isAfter(favorReservation.getAvailableTill())){
                free = false;
                break;
            }
            if(hotOffer.getAvailableFrom().isEqual(favorReservation.getAvailableFrom()) || hotOffer.getAvailableTill().isEqual(favorReservation.getAvailableTill()) || hotOffer.getAvailableTill().isEqual(favorReservation.getAvailableFrom()) || hotOffer.getAvailableFrom().isEqual(favorReservation.getAvailableTill())){
                free = false;
                break;
            }
        }

        return  free;
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
	
	private void sendNotificationForReservation(FavorReservation favorReservation){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(favorReservation.getClient().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("New reservation");
        mail.setText("Your reservation has been created by instructor!");
        emailService.sendSimpleMessage(mail);
    }

    private void sendNotificationForClientReservation(FavorReservation favorReservation) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(favorReservation.getClient().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("IzdajMe new reservation");
        mail.setText("New reservation is made from: " + favorReservation.getAvailableFrom() + " till: " + favorReservation.getAvailableTill() + " in ship: " + favorReservation.getFavor().getName() + " by: " + favorReservation.getClient().getFirstName());
        emailService.sendSimpleMessage(mail);
	}
		
    public void deleteByClientId(long id) {
        List<FavorReservation> reservations = favorReservationRepository.findAll();
        for(FavorReservation fr: reservations){
            if(fr.getClient().getId() == id)
                favorReservationRepository.deleteById(fr.getId());
        }
    }

    public List<FavorReservation> getAllReservationsOfInstructorFavors(String email) {
        Iterable<FavorReservation> allReservations = favorReservationRepository.getAllReservationsOfInstructorFavors(email);
        ArrayList<FavorReservation> allReservationsList = new ArrayList<FavorReservation>();
        allReservations.forEach(allReservationsList::add);

        return allReservationsList;
    }

    public List<FavorReservation> getFavorReservationsOfClient(String email) {
        return favorReservationRepository.findAllByClientEmail(email);
    }

    public Boolean cancelFavorReservationByClient(FavorReservation favorReservation) {
        if (favorReservationRepository.existsById(favorReservation.getId())) {
            favorReservationRepository.deleteById(favorReservation.getId());
            return true;
        }

        return false;
    }
}
