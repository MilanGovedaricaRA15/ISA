package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class InstructorsFavorServiceImpl implements InstructorsFavorService{
    @Autowired
    private InstructorsFavorRepository instructorsFavorRepository;
    @Autowired
    private FavorReservationRepository favorReservationRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FavorHotOfferRepository favorHotOfferRepository;
    @Autowired
    private ConcurentWatcherRepository concurentWatcherRepository;

    public List<InstructorsFavor> getAllFavors() {
        Iterable<InstructorsFavor> allFavors = instructorsFavorRepository.findAll();
        ArrayList<InstructorsFavor> allFavorsList = new ArrayList<InstructorsFavor>();
        allFavors.forEach(allFavorsList::add);

        return allFavorsList;
    }

    public List<InstructorsFavor> getAllAvailableFavors(LocalDateTime from, LocalDateTime to, int numOfGuests) {
        Iterable<InstructorsFavor> allCottages = getAllFavors();
        ArrayList<InstructorsFavor> allAvailableFavors = new ArrayList<>();

        for (InstructorsFavor c : allCottages) {
            if (isFavorAvailable(c.getId(), from, to, numOfGuests)) {
                allAvailableFavors.add(c);
            }
        }

        return allAvailableFavors;
    }

    @Transactional(readOnly = false)
    public Boolean deleteFavor(long id) {
        if (!concurentWatcherRepository.findByTableName("FavorReservation").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("Favor");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            instructorsFavorRepository.deleteById(id);

            cw.setWriting(false);
            concurentWatcherRepository.save(cw);

            return true;
        } else {
            return false;
        }
    }

    public InstructorsFavor getFavorById(long id) {
        InstructorsFavor favor = instructorsFavorRepository.findById(id).get();
        favor.setHotOffers(checkFavorHotOffers(favor.getHotOffers()));
        instructorsFavorRepository.save(favor);
        return favor;
    }

    public List<FavorHotOffer> checkFavorHotOffers(List<FavorHotOffer> favorHotOffers) {
        LocalDateTime now = LocalDateTime.now();
        Iterator<FavorHotOffer> it = favorHotOffers.iterator();
        while(it.hasNext()){
            FavorHotOffer offer = it.next();
            if(offer.getValidUntil().isBefore(now))
                it.remove();
        }
        return favorHotOffers;
    }

    public Boolean checkIsReserved(InstructorsFavor favor){
        if(!isReserved(favor.getId())) {
            return true;
        }
        else{
            return false;
        }
    }

    @Transactional(readOnly = false)
    public Boolean changeFavor(InstructorsFavor favor) {
        if (!concurentWatcherRepository.findByTableName("FavorReservation").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("Favor");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            if(!isReserved(favor.getId())) {
                instructorsFavorRepository.save(favor);

                cw.setWriting(false);
                concurentWatcherRepository.save(cw);

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

    @Transactional(readOnly = false)
    public Boolean addHotOfferToFavor(InstructorsFavor favor){
        if (!concurentWatcherRepository.findByTableName("FavorReservation").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("FavorHotOffer");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            List<FavorHotOffer> hotOffers = favor.getHotOffers();
            InstructorsFavor favor1 = instructorsFavorRepository.findById(favor.getId()).get();
            List<FavorHotOffer> hotOffersWithout = favor1.getHotOffers();
            List<FavorReservation> allThisFavorReservations = favorReservationRepository.findAllByReservationId(favor.getId());

            FavorHotOffer addedHotOffer = new FavorHotOffer();
            boolean exists = false;
            for (FavorHotOffer offer : hotOffers){
                exists = false;
                for(FavorHotOffer offer1 : favor1.getHotOffers()){
                    if (offer1.getId() == offer.getId()){
                        exists = true;
                        break;
                    }
                }
                if(!exists){
                    addedHotOffer = offer;
                    break;
                }
            }
            boolean free = canAddHotOffer(hotOffersWithout,addedHotOffer,allThisFavorReservations);

            if(free){
                InstructorsFavor updatedFavor = setValid(favor);
                instructorsFavorRepository.save(updatedFavor);
                sendNotificationForNewHotOffer(updatedFavor);
            }

            cw.setWriting(false);
            concurentWatcherRepository.save(cw);

            return free;
        }
        else {
            return false;
        }
    }

    private InstructorsFavor setValid(InstructorsFavor favor){
        for(FavorHotOffer hotOffer: favor.getHotOffers()){
            if(hotOffer.getValidUntil() == null) {
                hotOffer.setValidUntil(LocalDateTime.now().plusMonths(1));
            }
        }

        return favor;
    }

    private void sendNotificationForNewHotOffer(InstructorsFavor favor){
        List<User> users = userRepository.findAll();
        for(User user: users){
            if(user.getPrepaid() && user.isVerified()) {
                SimpleMailMessage mail = new SimpleMailMessage();
                mail.setTo(user.getEmail());
                mail.setFrom("rajkorajkeza@gmail.com");
                mail.setSubject("New hot offer for favor");
                mail.setText("There is a new hot offer for a favor: " + favor.getName() + "\n"
                + "Instructor: " + favor.getInstructor().getFirstName() + " " + favor.getInstructor().getLastName() + "\n"
                + "Cost: " + favor.getCost());
                emailService.sendSimpleMessage(mail);
            }
        }
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
        return instructorsFavorRepository.findAllByFavorEmail(email);
    }

    public Boolean isFavorAvailable(Long id, LocalDateTime from, LocalDateTime to, int numOfGuests) {
        InstructorsFavor f = instructorsFavorRepository.findById(id).get();
        if (from.compareTo(f.getAvailableTill()) > 0 || to.compareTo(f.getAvailableTill()) > 0  ||
                to.compareTo(f.getAvailableFrom()) < 0 || from.compareTo(f.getAvailableFrom()) < 0 ) {
            return false;
        } else {
            if (isReservedFromTill(id, from, to)) {
                return false;
            } else {
                if (f.getNumOfPersons() < numOfGuests) {
                    return false;
                }
            }
        }

        return true;
    }

    public Boolean isReservedFromTill(Long id, LocalDateTime from, LocalDateTime to) {
        List<FavorReservation> favorReservations = favorReservationRepository.findAllByFavorId(id);

        for (FavorReservation f : favorReservations) {
            if ((from.compareTo(f.getAvailableFrom()) > 0 && from.compareTo(f.getAvailableTill()) < 0) ||
                    (to.compareTo(f.getAvailableFrom()) > 0 && to.compareTo(f.getAvailableTill()) < 0) ||
                    (from.compareTo(f.getAvailableFrom()) < 0 && to.compareTo(f.getAvailableTill()) > 0)) {
                return true;
            }
        }

        return false;
    }

    @Transactional(readOnly = false)
    public Boolean deleteFavorHotOffer(InstructorsFavor favor) {
        if (!concurentWatcherRepository.findByTableName("FavorReservation").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("FavorHotOffer");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            if (instructorsFavorRepository.existsById(favor.getId())) {
                instructorsFavorRepository.save(favor);

                cw.setWriting(false);
                concurentWatcherRepository.save(cw);

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

    @Override
    public List<InstructorsFavor> searchInstructorsFavorsByName(String email, String name) {
        List<InstructorsFavor> searchedFavors = new ArrayList<>();

        List<InstructorsFavor> instructorFavors = instructorsFavorRepository.findAllByFavorEmail(email);
        for (InstructorsFavor s : instructorFavors) {
            if (s.getName().toLowerCase().contains(name.toLowerCase())){
                searchedFavors.add(s);
            }
        }

        return searchedFavors;
    }

    @Override
    public List<InstructorsFavor> searchInstructorsFavorsByAddress(String email, String address) {
        List<InstructorsFavor> searchedFavors = new ArrayList<>();

        List<InstructorsFavor> instructorFavors = instructorsFavorRepository.findAllByFavorEmail(email);
        for (InstructorsFavor s : instructorFavors) {
            if (s.getAddress().toLowerCase().contains(address.toLowerCase())){
                searchedFavors.add(s);
            }
        }

        return searchedFavors;
    }
}
