package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.ShipReservation;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ShipReservationService {
    public List<ShipReservation> getAllReservationsOfShip(Long id);
    public List<ShipReservation> getAllReservationsOfOwner(String email);
    public Boolean addReservationByOwner(ShipReservation shipReservation);
    public List<ShipReservation> getAllReservationsOfShipFromTill(Long id,String from,String to);
}
