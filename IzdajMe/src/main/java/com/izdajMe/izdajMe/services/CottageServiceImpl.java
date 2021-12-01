package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.CottageReservationRepository;
import com.izdajMe.izdajMe.repository.HotOfferRepository;
import com.izdajMe.izdajMe.repository.UserRepository;
import com.sun.deploy.net.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

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


    public ResponseEntity<List<Cottage>> getAllCottagesOfOwner(String email){
        Iterable<Cottage> allCottages = cottageRepository.findAll();
        ArrayList<Cottage> allCottagesList = new ArrayList<Cottage>();
        ArrayList<Cottage> ownerCottagesList = new ArrayList<Cottage>();
        allCottages.forEach(allCottagesList::add);
        for(Cottage cottage : allCottagesList){
            if(cottage.getOwner().getEmail().equals(email)){
                ownerCottagesList.add(cottage);
            }
        }

        return new ResponseEntity<List<Cottage>>(ownerCottagesList,HttpStatus.OK);
    }

    public ResponseEntity<Cottage> getCottageById(Long id) {
        if (cottageRepository.existsById(id)){
            return new ResponseEntity<Cottage>(cottageRepository.findById(id).get(),HttpStatus.OK);

        }
        else{
            return new ResponseEntity<Cottage>(new Cottage(),HttpStatus.NOT_FOUND);
        }

    }

    public ResponseEntity<List<Cottage>> getAllCottages(){
        Iterable<Cottage> allCottages = cottageRepository.findAll();
        ArrayList<Cottage> allCottagesList = new ArrayList<Cottage>();
        allCottages.forEach(allCottagesList::add);

        return new ResponseEntity<List<Cottage>>(allCottagesList,HttpStatus.OK);
    }

    public ResponseEntity<Void> removeCottageImg(Cottage cottage){
        if(!isReserved(cottage.getId())) {
            cottageRepository.deleteById(cottage.getId());
            cottageRepository.save(cottage);
            return ResponseEntity.ok(null);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);
        }
    }

    public ResponseEntity<Void> removeCottage(Long id){
        if(!isReserved(id)) {
            cottageRepository.deleteById(id);
            return ResponseEntity.ok(null);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);
        }
    }

    public ResponseEntity<Void> changeCottage(Cottage cottage){
        if(!isReserved(cottage.getId())) {
            cottageRepository.save(cottage);
            return ResponseEntity.ok(null);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);
        }
    }

    public ResponseEntity<Boolean> addHotOfferToCottage(Cottage cottage){
        List<HotOffer> hotOffers = cottage.getHotOffers();
        Cottage cottage1 = cottageRepository.findById(cottage.getId()).get();
        HotOffer addedHotOffer = new HotOffer();
        boolean postoji = false;
        for (HotOffer offer : hotOffers){
            postoji = false;
            for(HotOffer offer1 : cottage1.getHotOffers()){
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

        boolean slobodno = true;
        for(HotOffer hotOffer1 : cottage1.getHotOffers()) {
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
        if(slobodno) {
            cottageRepository.save(cottage);
            return new ResponseEntity<Boolean>(true,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Boolean>(false,HttpStatus.OK);
        }

    }



    public ResponseEntity<Cottage> addCottage(Cottage cottage){
        cottageRepository.save(cottage);
        return  new ResponseEntity<Cottage>(cottage,HttpStatus.OK);
    }

    public ResponseEntity<Boolean> uploadImg(MultipartFile file){

            String orgName = file.getOriginalFilename();

            String filePath = "../front/src/assets/images/" + orgName +".jpg";
            File dest = new File(filePath);
            if(!dest.exists())
            {

            }
            try {
                file.transferTo(Paths.get(filePath));
                return new ResponseEntity<Boolean>(true, HttpStatus.OK);
            }
            catch (IllegalStateException | IOException e)
            {
                e.printStackTrace();
                return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
            }


    }

    public boolean isReserved(Long id){
        Iterable<CottageReservation> allCottageReservations = cottageReservationRepository.findAll();
        ArrayList<CottageReservation> allCottageReservationsList = new ArrayList<CottageReservation>();
        allCottageReservations.forEach(allCottageReservationsList::add);
        for(CottageReservation cottageReservation : allCottageReservationsList){
            if(cottageReservation.getCottage().getId() == id){
                if(LocalDateTime.now().isBefore(cottageReservation.getAvailableTill())){
                    return true;
                }
            }
        }
        return false;
    }
}
