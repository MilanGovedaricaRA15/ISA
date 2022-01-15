package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.FavorHotOffer;
import java.util.List;

public interface FavorHotOfferService {
    public Boolean removeHotOffer(Long id);
    public List<FavorHotOffer> getAllFavorHotOffers();
    public List<FavorHotOffer> getFavorHotOffersByFavorId(Long favorId);
    public List<FavorHotOffer> getFutureFavorHotOffersByFavorId(Long favorId);
}
