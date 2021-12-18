package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.CottageReservation;
import com.izdajMe.izdajMe.model.ShipReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CottageReservationRepository extends JpaRepository<CottageReservation, Long> {
    @Query("Select c from CottageReservation c where c.cottage.id = ?1")
    public List<CottageReservation> findAllByCottageId(Long id);
    @Query("Select c from CottageReservation c where c.cottage.id = ?1 and c.availableFrom >= ?2 and c.availableTill <= ?3")
    public List<CottageReservation> findAllByCottageIdFromTill(Long id, LocalDateTime fromDate, LocalDateTime toDate);

}
