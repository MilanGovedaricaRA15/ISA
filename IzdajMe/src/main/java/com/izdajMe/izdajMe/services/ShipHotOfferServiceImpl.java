package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.FavorHotOffer;
import com.izdajMe.izdajMe.model.ShipHotOffer;
import com.izdajMe.izdajMe.repository.ShipHotOfferRepository;
import com.izdajMe.izdajMe.repository.ShipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShipHotOfferServiceImpl implements  ShipHotOfferService {
    @Autowired
    private ShipHotOfferRepository shipHotOfferRepository;
    @Autowired
    private ShipRepository shipRepository;

    @Override
    public List<ShipHotOffer> getAllShipHotOffers() {
        List<ShipHotOffer> shipHotOffers = new ArrayList<ShipHotOffer>();
        Iterable<ShipHotOffer> allShipHotOffers = shipHotOfferRepository.findAll();
        allShipHotOffers.forEach(shipHotOffers::add);

        return shipHotOffers;
    }

    @Override
    public List<ShipHotOffer> getShipHotOffersByShipId(Long shipId) {
        return shipRepository.getById(shipId).getHotOffers();
    }

    @Override
    public List<ShipHotOffer> getFutureShipHotOffersByShipId(Long shipId) {
        List<ShipHotOffer> futureHotOffers = new ArrayList<ShipHotOffer>();
        List<ShipHotOffer> hotOffers = shipRepository.getById(shipId).getHotOffers();

        for (ShipHotOffer ho : hotOffers) {
            if (ho.getAvailableFrom().isAfter(LocalDateTime.now())) {
                futureHotOffers.add(ho);
            }
        }

        return futureHotOffers;
    }
}
