package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.dto.ShipReservationDTO;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.FavorReservation;
import com.izdajMe.izdajMe.model.ShipReservation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface ShipReservationService {
    public List<ShipReservation> getAllReservationsOfShip(Long id);
    List<ShipReservation> getAllReservations();
    public List<ShipReservation> getAllReservationsOfOwner(String email);

    public Boolean addReservationByOwner(ShipReservation shipReservation);
    public Boolean addReservationByClient(ShipReservation shipReservation);
    public Boolean addShipHotOfferReservationByClient(ShipReservation shipReservation);
    public List<ShipReservation> getAllReservationsOfShipFromTill(Long id,String from,String to);
    public ShipReservation getById(Long id);
    public Boolean changeReservationByOwner(ShipReservation shipReservation);
    public void deleteByClientId(long id);
    public List<ShipReservation> getShipReservationsOfClient(String email);
    public Boolean cancelShipReservationByClient(ShipReservation shipReservation);
    public List<ShipReservation> getAllReservationsFromBaseFromTill(String from, String to);
}
