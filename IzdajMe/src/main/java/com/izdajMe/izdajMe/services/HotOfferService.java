package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.HotOffer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface HotOfferService {
    public Boolean saveHotOffer(HotOffer hotOffer);
    public Boolean removeHotOffer( Long id);
}
