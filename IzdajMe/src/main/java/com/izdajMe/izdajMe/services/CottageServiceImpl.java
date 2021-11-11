package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.HotOfferRepository;
import com.izdajMe.izdajMe.repository.UserRepository;
import com.sun.deploy.net.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CottageServiceImpl implements CottageService {
    @Autowired
    private CottageRepository cottageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotOfferRepository hotOfferRepository;


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

    public ResponseEntity<List<Cottage>> getAllCottages(){
        Iterable<Cottage> allCottages = cottageRepository.findAll();
        ArrayList<Cottage> allCottagesList = new ArrayList<Cottage>();
        allCottages.forEach(allCottagesList::add);

        return new ResponseEntity<List<Cottage>>(allCottagesList,HttpStatus.OK);
    }

    public ResponseEntity<Void> removeCottageImg(Cottage cottage){
        cottageRepository.deleteById(cottage.getId());
        cottageRepository.save(cottage);
        return ResponseEntity.ok(null);
    }
    public ResponseEntity<Void> changeCottage(Cottage cottage){
        cottageRepository.deleteById(cottage.getId());
        cottageRepository.save(cottage);
        return ResponseEntity.ok(null);
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
}
