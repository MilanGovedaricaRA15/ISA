package com.izdajMe.izdajMe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.izdajMe.izdajMe.repository.FavorHotOfferRepository;

@Service
public class FavorHotOfferServiceImpl implements FavorHotOfferService{

    @Autowired
    private FavorHotOfferRepository favorHotOfferRepository;

    public Boolean removeHotOffer( Long id) {
        favorHotOfferRepository.deleteById(id);
        return true;
    }
}
