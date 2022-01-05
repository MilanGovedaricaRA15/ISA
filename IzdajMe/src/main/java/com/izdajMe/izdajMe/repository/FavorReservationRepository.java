package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.FavorReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavorReservationRepository extends JpaRepository<FavorReservation, Long> {
    @Query("Select f from FavorReservation f where f.favor.id = ?1")
    public List<FavorReservation> findAllByReservationId(Long id);
}
