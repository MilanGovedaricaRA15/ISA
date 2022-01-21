package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.ShipHotOffer;

import java.util.List;

public interface ShipHotOfferService {
    public List<ShipHotOffer> getAllShipHotOffers();
    public List<ShipHotOffer> getShipHotOffersByShipId(Long shipId);
    public List<ShipHotOffer> getFutureShipHotOffersByShipId(Long shipId);
}
