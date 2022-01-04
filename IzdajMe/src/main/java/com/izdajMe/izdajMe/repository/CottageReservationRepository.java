package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.CottageReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CottageReservationRepository extends JpaRepository<CottageReservation, Long> {
    @Query("Select c from CottageReservation c where c.cottage.id = ?1")
    public List<CottageReservation> findAllByCottageId(Long id);
}
