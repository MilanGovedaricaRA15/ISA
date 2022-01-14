package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
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


    public List<Cottage> getAllCottagesOfOwner(String email){
        List<Cottage> ownerCottagesList = cottageRepository.findAllByCottageEmail(email);
        return ownerCottagesList;
    }

    public Cottage getCottageById(Long id) {
      return cottageRepository.findById(id).get();
    }

    public List<Cottage> getAllCottages(){
        Iterable<Cottage> allCottages = cottageRepository.findAll();
        ArrayList<Cottage> allCottagesList = new ArrayList<Cottage>();
        allCottages.forEach(allCottagesList::add);
        return allCottagesList;
    }

    public Boolean removeCottageImg(Cottage cottage){
        if(!isReserved(cottage.getId())) {
            cottageRepository.save(cottage);
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean removeCottage(Long id){
        if(!isReserved(id)) {
            cottageRepository.deleteById(id);
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean removeCottageByAdministrator(Long id){
        if(!isReserved(id)) {
            cottageRepository.deleteById(id);
        }
        else{
            removeCottageReservations(id);
            cottageRepository.deleteById(id);
        }
        return true;
    }

    private void removeCottageReservations(long id) {
        List<CottageReservation> cottageReservations = cottageReservationRepository.findAllByCottageId(id);
        if(cottageReservations.size() != 0) {
            for(CottageReservation cr : cottageReservations){
                cottageReservationRepository.delete(cr);
            }
        }
    }

    public Boolean checkIsReserved(Cottage cottage){
        if(!isReserved(cottage.getId())) {
            return true;
        }
        else{
            return false;
        }
    }
    @Transactional(readOnly = false)
    public Boolean changeCottage(Cottage cottage){
        if (concurentWatcherRepository.findByTableName("CottageReservation").getWriting() == false) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("Cottage");
            cw.setWriting(true);
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
        }
        else {
            return false;
        }
    }

    @Transactional(readOnly = false)
    public Boolean removeHotOffer(Cottage cottage){
        if (concurentWatcherRepository.findByTableName("CottageReservation").getWriting() == false) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("CottageHotOffer");
            cw.setWriting(true);
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
        }
        else{
            return  false;
        }
    }

    public Boolean canAddHotOffer(List<HotOffer> hotOffers,HotOffer addedHotOffer, List<CottageReservation> cottageReservations){
        boolean slobodno = true;
        for(HotOffer hotOffer1 : hotOffers) {
            if(addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer1.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && hotOffer1.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
        }
        if(addedHotOffer.getAvailableFrom().equals(addedHotOffer.getAvailableTill())){
            slobodno = false;
        }
        if(addedHotOffer.getAvailableFrom().isAfter(addedHotOffer.getAvailableTill())){
            slobodno = false;
        }

        for(CottageReservation cottageReservation : cottageReservations) {
            if(addedHotOffer.getAvailableFrom().isBefore(cottageReservation.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(cottageReservation.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(addedHotOffer.getAvailableFrom().isBefore(cottageReservation.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(cottageReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(cottageReservation.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && cottageReservation.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(cottageReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || cottageReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || cottageReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || cottageReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
        }


        return slobodno;
    }
    @Transactional(readOnly = false)
    public Boolean addHotOfferToCottage(Cottage cottage){
        if (concurentWatcherRepository.findByTableName("CottageReservation").getWriting() == false) {
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
            }
            cw.setWriting(false);
            concurentWatcherRepository.save(cw);
            return slobodno;
        } else{
            return false;
        }
    }



    public Cottage addCottage(Cottage cottage){
        cottageRepository.save(cottage);
        cottage.setHotOffers(new ArrayList<HotOffer>());
        cottage.setImages(new ArrayList<String>());
        cottage.setPriceList(new ArrayList<ServicePrice>());
        cottage.setServices(new ArrayList<Cottage.Services>());
        cottage.setGrades(new ArrayList<Grade>());
        return cottage;
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

    public boolean isReserved(Long id){
        List<CottageReservation> allCottageReservationsList = cottageReservationRepository.findAllByCottageId(id);
        for(CottageReservation cottageReservation : allCottageReservationsList){
            if(LocalDateTime.now().isBefore(cottageReservation.getAvailableTill())){
                return true;
            }
        }
        return false;
    }

    public List<Cottage> searchCottagesByName(String name) {
        List<Cottage> searchedCottages = new ArrayList<>();
        
        List<Cottage> cottages = cottageRepository.findAll();
        for (Cottage c : cottages) {
            if (c.getName().toLowerCase().contains(name.toLowerCase())){
                searchedCottages.add(c);
            }
        }
        
        return searchedCottages;
    }
}
