package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.HotOffer;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CottageServiceImpl implements CottageService {
    @Autowired
    private CottageRepository cottageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotOfferRepository hotOfferRepository;
    @Autowired
    private CottageReservationRepository cottageReservationRepository;
    @Autowired
    private ConcurentWatcherRepository concurentWatcherRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private ComplaintRepository complaintRepository;


    public List<Cottage> getAllCottagesOfOwner(String email) {
        List<Cottage> ownerCottagesList = cottageRepository.findAllByCottageEmail(email);
        return ownerCottagesList;
    }

    public Cottage getCottageById(Long id) {
        return cottageRepository.findById(id).get();
    }

    public List<Cottage> getAllCottages() {
        Iterable<Cottage> allCottages = cottageRepository.findAll();
        ArrayList<Cottage> allCottagesList = new ArrayList<Cottage>();
        allCottages.forEach(allCottagesList::add);
        return allCottagesList;
    }

    public List<Cottage> getAllAvailableCottages(LocalDateTime from, LocalDateTime to, int numOfGuests){
        Iterable<Cottage> allCottages = getAllCottages();
        ArrayList<Cottage> allAvailableCottages = new ArrayList<>();

        for (Cottage c : allCottages) {
            if (isCottageAvailable(c.getId(), from, to, numOfGuests)) {
                allAvailableCottages.add(c);
            }
        }

        return allAvailableCottages;
    }

    public Boolean removeCottageImg(Cottage cottage){
        if(!isReserved(cottage.getId())) {
            cottageRepository.save(cottage);
            return true;
        } else {
            return false;
        }
    }

    @Transactional(readOnly = false)
    public Boolean removeCottage(Long id) {
        if (!concurentWatcherRepository.findByTableName("CottageReservation").getWriting()
        && !concurentWatcherRepository.findByTableName("Grade").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("Cottage");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            if (!isReserved(id)) {
                cottageRepository.deleteById(id);

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

    public Boolean removeCottageByAdministrator(Long id) {
        Cottage cottage = cottageRepository.findById(id).get();
        cottage.setSubscribedUsers(new ArrayList<>());
        deleteComplaints(cottage);

        removeCottageReservations(id);
        cottageRepository.deleteById(id);

        return true;
    }

    private void deleteComplaints(Cottage cottage) {
        List<Complaint> complaints = complaintRepository.findAll();
        for(Complaint complaint: complaints) {
            if(complaint.getComplaintCottage() != null && complaint.getComplaintCottage().getId() == cottage.getId())
                complaintRepository.delete(complaint);
        }
    }

    private void removeCottageReservations(long id) {
        List<CottageReservation> cottageReservations = cottageReservationRepository.findAllByCottageId(id);
        if (cottageReservations.size() != 0) {
            for (CottageReservation cr : cottageReservations) {
                cottageReservationRepository.delete(cr);
            }
        }
    }

    public Boolean checkIsReserved(Cottage cottage) {
        if (!isReserved(cottage.getId())) {
            return true;
        } else {
            return false;
        }
    }

    @Transactional(readOnly = false)
    public Boolean changeCottage(Cottage cottage) {
        if (!concurentWatcherRepository.findByTableName("CottageReservation").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("Cottage");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            if (!isReserved(cottage.getId())) {
                cottageRepository.save(cottage);

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

    @Transactional(readOnly = false)
    public Boolean removeHotOffer(Cottage cottage) {
        if (!concurentWatcherRepository.findByTableName("CottageReservation").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("CottageHotOffer");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            if (cottageRepository.existsById(cottage.getId())) {
                cottageRepository.save(cottage);

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

    public Boolean canAddHotOffer(List<HotOffer> hotOffers, HotOffer addedHotOffer, List<CottageReservation> cottageReservations) {
        boolean slobodno = true;
        for (HotOffer hotOffer1 : hotOffers) {
            if (addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableFrom())) {
                slobodno = false;
                break;
            }
            if (addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (hotOffer1.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && hotOffer1.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())) {
                slobodno = false;
                break;
            }
        }
        if (addedHotOffer.getAvailableFrom().equals(addedHotOffer.getAvailableTill())) {
            slobodno = false;
        }
        if (addedHotOffer.getAvailableFrom().isAfter(addedHotOffer.getAvailableTill())) {
            slobodno = false;
        }

        for (CottageReservation cottageReservation : cottageReservations) {
            if (addedHotOffer.getAvailableFrom().isBefore(cottageReservation.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(cottageReservation.getAvailableFrom())) {
                slobodno = false;
                break;
            }
            if (addedHotOffer.getAvailableFrom().isBefore(cottageReservation.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(cottageReservation.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (cottageReservation.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && cottageReservation.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (cottageReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || cottageReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || cottageReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || cottageReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())) {
                slobodno = false;
                break;
            }
        }


        return slobodno;
    }

    @Transactional(readOnly = false)
    public Boolean addHotOfferToCottage(Cottage cottage) {
        if (!concurentWatcherRepository.findByTableName("CottageReservation").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("CottageHotOffer");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            List<HotOffer> hotOffers = cottage.getHotOffers();
            Cottage cottage1 = cottageRepository.findById(cottage.getId()).get();
            List<HotOffer> hotOffersWithout = cottage1.getHotOffers();
            List<CottageReservation> allThisCottageReservations = cottageReservationRepository.findAllByCottageId(cottage.getId());

            HotOffer addedHotOffer = new HotOffer();
            boolean postoji = false;
            for (HotOffer offer : hotOffers) {
                postoji = false;
                for (HotOffer offer1 : cottage1.getHotOffers()) {
                    if (offer1.getId() == offer.getId()) {
                        postoji = true;
                        break;
                    }
                }
                if (!postoji) {
                    addedHotOffer = offer;
                    break;
                }
            }
            boolean slobodno = canAddHotOffer(hotOffersWithout, addedHotOffer, allThisCottageReservations);

            if (slobodno) {
                cottageRepository.save(cottage);
                sendNotificationForNewHotOffer(cottage,addedHotOffer);
            }

            cw.setWriting(false);
            concurentWatcherRepository.save(cw);

            return slobodno;
        } else {
            return false;
        }
    }

    private void sendNotificationForNewHotOffer(Cottage cottage, HotOffer addedHotOffer){
        List<User> users = cottage.getSubscribedUsers();
        for(User user: users){
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(user.getEmail());
            mail.setFrom("rajkorajkeza@gmail.com");
            mail.setSubject("New hot offer for cottage "+ cottage.getName() );
            mail.setText("There is a new hot offer for a cottage: " + cottage.getName() + "\n"
                    + "Owner: " + cottage.getOwner().getFirstName() + " " + cottage.getOwner().getLastName() + "\n"
                    + "Cost: " + addedHotOffer.getCost());
            emailService.sendSimpleMessage(mail);
        }
    }

    public Cottage addCottage(Cottage cottage) {
        cottageRepository.save(cottage);
        cottage.setHotOffers(new ArrayList<HotOffer>());
        cottage.setImages(new ArrayList<String>());
        cottage.setPriceList(new ArrayList<ServicePrice>());
        cottage.setServices(new ArrayList<Cottage.Services>());
        cottage.setGrades(new ArrayList<Grade>());
        return cottage;
    }

    public Boolean uploadImg(MultipartFile file) {

        String orgName = file.getOriginalFilename();

        String filePath = "../front/src/assets/images/" + orgName + ".jpg";
        File dest = new File(filePath);
        if (!dest.exists()) {

        }
        try {
            file.transferTo(Paths.get(filePath));
            return true;
        } catch (IllegalStateException | IOException e) {
            return false;
        }
    }

    public boolean isReserved(Long id) {
        List<CottageReservation> allCottageReservationsList = cottageReservationRepository.findAllByCottageId(id);
        for (CottageReservation cottageReservation : allCottageReservationsList) {
            if (LocalDateTime.now().isBefore(cottageReservation.getAvailableTill())) {
                return true;
            }
        }
        return false;
    }

    public List<Cottage> searchCottagesByName(String name) {
        List<Cottage> searchedCottages = new ArrayList<>();

        List<Cottage> cottages = cottageRepository.findAll();
        for (Cottage c : cottages) {
            if (c.getName().toLowerCase().contains(name.toLowerCase())) {
                searchedCottages.add(c);
            }
        }

        return searchedCottages;
    }

    @Override
    public List<Cottage> searchCottagesByAddress(String address) {
        List<Cottage> searchedCottages = new ArrayList<>();

        List<Cottage> cottages = cottageRepository.findAll();
        for (Cottage c : cottages) {
            if (c.getAddress().toLowerCase().contains(address.toLowerCase())) {
                searchedCottages.add(c);
            }
        }

        return searchedCottages;
    }

    @Override
    public List<Cottage> searchCottagesByCost(Float minCost, Float maxCost) {
        List<Cottage> searchedCottages = new ArrayList<>();

        List<Cottage> cottages = cottageRepository.findAll();
        for (Cottage c : cottages) {
            if (minCost <= c.getCostPerNight() && c.getCostPerNight() <= maxCost) {
                searchedCottages.add(c);
            }
        }

        return searchedCottages;
    }

    public Boolean isCottageAvailable(Long id, LocalDateTime from, LocalDateTime to, int numOfGuests) {
        Cottage c = cottageRepository.findById(id).get();
        if (from.compareTo(c.getAvailableTill()) > 0 || to.compareTo(c.getAvailableTill()) > 0  ||
                to.compareTo(c.getAvailableFrom()) < 0 || from.compareTo(c.getAvailableFrom()) < 0 ) {
            return false;
        } else {
            if (isReservedFromTill(id, from, to)) {
                return false;
            } else {
                if (c.getNumOfBeds() < numOfGuests) {
                    return false;
                }
            }
        }

        return true;
    }

    public Boolean isReservedFromTill(Long id, LocalDateTime from, LocalDateTime to) {
        List<CottageReservation> cottageReservations = cottageReservationRepository.findAllByCottageId(id);

        for (CottageReservation c : cottageReservations) {
            if ((from.compareTo(c.getAvailableFrom()) > 0 && from.compareTo(c.getAvailableTill()) < 0) ||
                    (to.compareTo(c.getAvailableFrom()) > 0 && to.compareTo(c.getAvailableTill()) < 0) ||
                    (from.compareTo(c.getAvailableFrom()) < 0 && to.compareTo(c.getAvailableTill()) > 0)) {
                return true;
            }
        }

        return false;
    }

    public Boolean deleteHotOffer(Cottage cottage) {
        if (cottageRepository.existsById(cottage.getId())) {
            cottageRepository.save(cottage);
            return true;
        }

        return false;
    }

    @Override
    public Boolean addSubscribedUserToCottage(Cottage cottage) {
        cottageRepository.save(cottage);
        return true;
    }

    @Override
    public Boolean removeSubscribedUserFromCottage(Cottage cottage) {
        cottageRepository.save(cottage);
        return true;
    }

    @Override
    public List<Cottage> getUsersSubscribedCottages(String email) {
        List<Cottage> usersSubscribedCottages = new ArrayList<Cottage>();
        List<Cottage> allCottages = cottageRepository.findAll();

        for (Cottage c : allCottages) {
            for (User u : c.getSubscribedUsers()) {
                if (u.getEmail().equals(email)) {
                    usersSubscribedCottages.add(c);
                    break;
                }
            }
        }

        return usersSubscribedCottages;
    }

    @Override
    public Boolean isUserSubscribedToCottage(String email, Long cottageId) {
        List<Cottage> usersSubscribedCottages = getUsersSubscribedCottages(email);

        for (Cottage c : usersSubscribedCottages) {
            if (c.getId() == cottageId) {
                return true;
            }
        }

        return false;
    }
}
