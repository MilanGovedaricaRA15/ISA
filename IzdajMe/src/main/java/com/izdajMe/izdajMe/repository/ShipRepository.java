package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.Ship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipRepository extends JpaRepository<Ship, Long>  {
    @Query("Select c from Ship c where c.owner.email=?1")
    public List<Ship> findAllByShipEmail(String email);
    @Query("Select c from Ship c where c.owner.id=?1")
    public List<Ship> findShipsById(long id);
}
