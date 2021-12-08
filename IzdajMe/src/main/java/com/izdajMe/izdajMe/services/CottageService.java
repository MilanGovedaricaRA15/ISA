package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


public interface CottageService {
    public List<Cottage> getAllCottagesOfOwner(String email);
    public List<Cottage> getAllCottages();
    public Boolean removeCottageImg(Cottage cottage);
    public Boolean removeCottage(Long id);
    public Boolean changeCottage(Cottage cottage);
    public Boolean checkIsReserved(Cottage cottage);
    public Boolean removeHotOffer(Cottage cottage);
    public Boolean addHotOfferToCottage(Cottage cottage);
    public Boolean uploadImg( MultipartFile file);
    public Cottage getCottageById(Long id);
    public Cottage addCottage(Cottage cottage);
    public boolean isReserved(Long id);
    public List<Cottage> searchCottagesByName(String name);
}