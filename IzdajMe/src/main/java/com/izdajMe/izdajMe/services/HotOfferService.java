package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.HotOffer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface HotOfferService {
    public ResponseEntity<Void> saveHotOffer(HotOffer hotOffer);
}
