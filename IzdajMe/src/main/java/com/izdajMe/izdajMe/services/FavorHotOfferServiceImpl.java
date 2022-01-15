package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.FavorHotOffer;
import com.izdajMe.izdajMe.repository.InstructorsFavorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.izdajMe.izdajMe.repository.FavorHotOfferRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FavorHotOfferServiceImpl implements FavorHotOfferService{
    @Autowired
    private FavorHotOfferRepository favorHotOfferRepository;
    @Autowired
    private InstructorsFavorRepository instructorsFavorRepository;

    public Boolean removeHotOffer(Long id) {
        favorHotOfferRepository.deleteById(id);
        return true;
    }

    public List<FavorHotOffer> getAllFavorHotOffers() {
        List<FavorHotOffer> favorHotOffers = new ArrayList<FavorHotOffer>();
        Iterable<FavorHotOffer> allFavorHotOffers = favorHotOfferRepository.findAll();
        allFavorHotOffers.forEach(favorHotOffers::add);

        return favorHotOffers;
    }

    public List<FavorHotOffer> getFavorHotOffersByFavorId(Long favorId) {
        return instructorsFavorRepository.getById(favorId).getHotOffers();
    }

    public List<FavorHotOffer> getFutureFavorHotOffersByFavorId(Long favorId) {
        List<FavorHotOffer> futureHotOffers = new ArrayList<FavorHotOffer>();
        List<FavorHotOffer> hotOffers = instructorsFavorRepository.getById(favorId).getHotOffers();

        for (FavorHotOffer ho : hotOffers) {
            if (ho.getAvailableFrom().isAfter(LocalDateTime.now())) {
                futureHotOffers.add(ho);
            }
        }

        return futureHotOffers;
    }
}
