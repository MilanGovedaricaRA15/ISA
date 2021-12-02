package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CottageReservationService {
    public List<CottageReservation> getAllReservationsOfCottage(Long id);
    public List<CottageReservation> getAllReservationsOfOwner(String email);
    public Boolean addReservationByOwner(CottageReservation cottageReservation);
}
