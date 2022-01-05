package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.FavorReservation;

import java.util.List;

public interface FavorReservationService {

    List<FavorReservation> getAllReservations();
    Boolean addReservationByOwner(FavorReservation favorReservation);
    FavorReservation getById(long id);
}
