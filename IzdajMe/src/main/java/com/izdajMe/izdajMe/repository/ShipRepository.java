package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.Ship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipRepository extends JpaRepository<Ship, Long>  {
}
