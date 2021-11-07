package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.HotOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

@Service
public class HotOfferServiceImpl implements HotOfferService {
    @Autowired
    private HotOfferRepository hotOfferRepository;
    public ResponseEntity<Void> saveHotOffer(HotOffer hotOffer){
        hotOfferRepository.save(hotOffer);
        return ResponseEntity.ok(null);
    }
}
