package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.FavorHotOffer;
import com.izdajMe.izdajMe.model.ShipReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface FavorHotOfferRepository extends JpaRepository<FavorHotOffer, Long> {
    @Query("Select f from FavorHotOffer f where f.availableFrom >= ?1 and f.availableTill <= ?2")
    public List<FavorHotOffer> findAllFromBaseFromTill(LocalDateTime fromDate, LocalDateTime toDate);

}
