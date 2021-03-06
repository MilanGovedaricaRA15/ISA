package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.HotOffer;
import com.izdajMe.izdajMe.model.ShipHotOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface HotOfferRepository extends JpaRepository<HotOffer, Long> {
}
