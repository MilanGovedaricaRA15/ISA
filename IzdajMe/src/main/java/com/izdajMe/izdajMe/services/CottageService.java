package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.ArrayList;
import java.util.List;


public interface CottageService {
    public ResponseEntity<List<Cottage>> getAllCottagesOfOwner(String email);
    public ResponseEntity<List<Cottage>> getAllCottages();
    public ResponseEntity<Void> removeCottageImg(Cottage cottage);
    public ResponseEntity<Void> changeCottage(Cottage cottage);
}