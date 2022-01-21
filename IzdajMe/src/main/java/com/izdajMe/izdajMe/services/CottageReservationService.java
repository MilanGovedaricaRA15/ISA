package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.FavorReservation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CottageReservationService {
    public List<CottageReservation> getAllReservations();
    public List<CottageReservation> getAllReservationsOfCottage(Long id);
    public List<CottageReservation> getAllReservationsOfOwner(String email);
    public Boolean addReservationByOwner(CottageReservation cottageReservation);
    public Boolean addReservationByClient(CottageReservation cottageReservation);
    public Boolean addHotOfferReservationByClient(CottageReservation cottageReservation);
    public List<CottageReservation> getAllReservationsOfCottageFromTill(Long id, String from,String to);
    public CottageReservation getById(Long id);
    public Boolean changeReservationByOwner(CottageReservation cottageReservation);
    public void deleteByClientId(long id);
    public List<CottageReservation> getCottageReservationsOfClient(String email);
    public Boolean cancelCottageReservationByClient(CottageReservation cottageReservation);
    public List<CottageReservation> getAllReservationsFromBaseFromTill(String from, String to);
}
