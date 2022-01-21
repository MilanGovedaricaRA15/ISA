package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.FavorHotOffer;
import com.izdajMe.izdajMe.model.ShipHotOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ShipHotOfferRepository extends JpaRepository<ShipHotOffer, Long> {
    @Query("Select s from ShipHotOffer s where s.availableFrom >= ?1 and s.availableTill <= ?2")
    public List<ShipHotOffer> findAllFromBaseFromTill(LocalDateTime fromDate, LocalDateTime toDate);
}
