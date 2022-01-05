package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.FavorReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavorReservationRepository extends JpaRepository<FavorReservation, Long> {
}
