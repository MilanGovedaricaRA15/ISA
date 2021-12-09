package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Ship;

import java.util.List;

public interface ShipService {
    public List<Ship> getAllShips();
    public Ship getShipById(Long id);
    public List<Ship> searchShipsByName(String name);
    public float getShipAverageGrade(Long id);
}
