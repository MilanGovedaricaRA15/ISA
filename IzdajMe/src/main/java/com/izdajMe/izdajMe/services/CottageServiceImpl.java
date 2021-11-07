package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.UserRepository;
import com.sun.deploy.net.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CottageServiceImpl implements CottageService {
    @Autowired
    private CottageRepository cottageRepository;


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
}
