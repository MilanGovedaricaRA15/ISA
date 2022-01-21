package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.FavorReservation;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.HotOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class HotOfferServiceImpl implements HotOfferService {
    @Autowired
    private HotOfferRepository hotOfferRepository;
    @Autowired
    private CottageRepository cottageRepository;

    public Boolean saveHotOffer(HotOffer hotOffer) {
        if (hotOffer.getAvailableFrom().isBefore(hotOffer.getAvailableTill()) || hotOffer.getAvailableFrom().isEqual(hotOffer.getAvailableTill())) {
            hotOfferRepository.save(hotOffer);
            return true;
        } else {
            return false;
        }

    }

    public List<HotOffer> getAllHotOffersFromBaseFromTill(String from, String to) {
        Timestamp fromDateTs = new Timestamp(Long.parseLong(from));
        Timestamp toDateTs = new Timestamp(Long.parseLong(to));
        LocalDateTime fromDate = fromDateTs.toLocalDateTime();
        LocalDateTime toDate = toDateTs.toLocalDateTime();


        List<HotOffer> allCottageHotOffers = hotOfferRepository.findAllFromBaseFromTill(fromDate, toDate);
        return allCottageHotOffers;
    }

    public Boolean removeHotOffer(Long id) {
        hotOfferRepository.deleteById(id);
        return true;
    }

    public List<HotOffer> getAllHotOffers() {
        List<HotOffer> hotOffers = new ArrayList<HotOffer>();
        Iterable<HotOffer> allHotOffers = hotOfferRepository.findAll();
        allHotOffers.forEach(hotOffers::add);

        return hotOffers;
    }

    public List<HotOffer> getHotOffersByCottageId(Long cottageId) {
        return cottageRepository.getById(cottageId).getHotOffers();
    }

    public List<HotOffer> getFutureHotOffersByCottageId(Long cottageId) {
        List<HotOffer> futureHotOffers = new ArrayList<HotOffer>();
        List<HotOffer> hotOffers = cottageRepository.getById(cottageId).getHotOffers();

        for (HotOffer ho : hotOffers) {
            if (ho.getAvailableFrom().isAfter(LocalDateTime.now())) {
                futureHotOffers.add(ho);
            }
        }

        return futureHotOffers;
    }
}
