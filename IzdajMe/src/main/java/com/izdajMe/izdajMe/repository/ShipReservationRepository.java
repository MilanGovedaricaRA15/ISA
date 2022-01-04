package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.Ship;
import com.izdajMe.izdajMe.model.ShipReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShipReservationRepository extends JpaRepository<ShipReservation, Long> {
    @Query("Select c from ShipReservation c where c.ship.id = ?1")
    public List<ShipReservation> findAllByShipId(Long id);
    @Query("Select c from ShipReservation c where c.ship.id = ?1 and c.availableFrom >= ?2 and c.availableTill <= ?3")
    public List<ShipReservation> findAllByShipIdFromTill(Long id, LocalDateTime fromDate,LocalDateTime toDate);
}
