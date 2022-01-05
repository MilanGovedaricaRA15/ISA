package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.FavorReservation;
import com.izdajMe.izdajMe.repository.FavorReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavorReservationServiceImpl implements FavorReservationService{

    @Autowired
    private FavorReservationRepository favorReservationRepository;

    @Override
    public List<FavorReservation> getAllReservations() {
        Iterable<FavorReservation> allReservations = favorReservationRepository.findAll();
        ArrayList<FavorReservation> allReservationsList = new ArrayList<FavorReservation>();
        allReservations.forEach(allReservationsList::add);

        return allReservationsList;
    }
}
