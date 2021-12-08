package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Ship;
import com.izdajMe.izdajMe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShipServiceImpl implements  ShipService {
    @Autowired
    private ShipRepository shipRepository;

    @Override
    public List<Ship> getAllShips() {
        Iterable<Ship> allShips = shipRepository.findAll();
        ArrayList<Ship> allShipsList = new ArrayList<Ship>();
        allShips.forEach(allShipsList::add);

        return allShipsList;
    }

    @Override
    public Ship getShipById(Long id) {
        return shipRepository.findById(id).get();
    }

    @Override
    public List<Ship> searchShipsByName(String name) {
        List<Ship> searchedShips = new ArrayList<>();

        List<Ship> ships = shipRepository.findAll();
        for (Ship s : ships) {
            if (s.getName().toLowerCase().contains(name.toLowerCase())){
                searchedShips.add(s);
            }
        }

        return searchedShips;
    }
}
