package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.FavorReservation;

import java.util.List;

public interface FavorReservationService {

    List<FavorReservation> getAllReservations();
    Boolean addReservationByOwner(FavorReservation favorReservation);
    Boolean addReservationByClient(FavorReservation favorReservation);
    FavorReservation getById(long id);
    public Boolean changeReservationByInstructor(FavorReservation favorReservation);
    public void deleteByClientId(long id);
}
