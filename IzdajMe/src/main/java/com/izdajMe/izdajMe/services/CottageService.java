package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;


public interface CottageService {
    public List<Cottage> getAllCottagesOfOwner(String email);
    public List<Cottage> getAllCottages();
    public List<Cottage> getAllAvailableCottages(LocalDateTime from, LocalDateTime to, int numOfGuests);
    public Boolean removeCottageImg(Cottage cottage);
    public Boolean removeCottage(Long id);
    public Boolean changeCottage(Cottage cottage);
    public Boolean checkIsReserved(Cottage cottage);
    public Boolean removeHotOffer(Cottage cottage);
    public Boolean addHotOfferToCottage(Cottage cottage);
    public Boolean uploadImg(MultipartFile file);
    public Cottage getCottageById(Long id);
    public Cottage addCottage(Cottage cottage);
    public boolean isReserved(Long id);
    public List<Cottage> searchCottagesByName(String name);
    public Boolean removeCottageByAdministrator(Long id);
    public Boolean deleteHotOffer(Cottage cottage);
    public Boolean addSubscribedUserToCottage(Cottage cottage);
    public Boolean removeSubscribedUserFromCottage(Cottage cottage);
    public List<Cottage> getUsersSubscribedCottages(String email);
    public Boolean isUserSubscribedToCottage(String email, Long cottageId);
}