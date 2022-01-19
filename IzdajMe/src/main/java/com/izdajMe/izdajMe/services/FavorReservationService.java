package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.FavorReservation;

import java.util.List;

public interface FavorReservationService {

    List<FavorReservation> getAllReservations();
    Boolean addReservationByOwner(FavorReservation favorReservation);
    public Boolean addReservationByClient(FavorReservation favorReservation);
    public Boolean addFavorHotOfferReservationByClient(FavorReservation favorReservation);
    FavorReservation getById(long id);
    public Boolean changeReservationByInstructor(FavorReservation favorReservation);
    public void deleteByClientId(long id);
    List<FavorReservation> getAllReservationsOfInstructorFavors(String email);
    public List<FavorReservation> getFavorReservationsOfClient(String email);
    public Boolean cancelFavorReservationByClient(FavorReservation favorReservation);
    public List<FavorReservation> getAllReservationsOfFavorFromTill(Long id, String from, String to);
    public List<FavorReservation> getAllReservationsOfFavor(Long id);
    public List<FavorReservation> getAllReservationsFromTill(Long id, String from, String to);
}
