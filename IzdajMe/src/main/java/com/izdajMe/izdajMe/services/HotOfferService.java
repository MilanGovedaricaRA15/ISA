package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.HotOffer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface HotOfferService {
    public Boolean saveHotOffer(HotOffer hotOffer);
    public Boolean removeHotOffer(Long id);
    public List<HotOffer> getAllHotOffers();
    public List<HotOffer> getHotOffersByCottageId(Long cottageId);
    public List<HotOffer> getFutureHotOffersByCottageId(Long cottageId);
}
