package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.Ship;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public interface ShipService {
    public List<Ship> getAllShips();
    public List<Ship> getAllAvailableShips(LocalDateTime from, LocalDateTime to, int numOfGuests);
    public Ship getShipById(Long id);
    public List<Ship> searchShipsByName(String name);
    public float getShipAverageGrade(Long id);
    public List<Ship> getAllShipsOfOwner(String email);
    public Boolean removeShipImg(Ship ship);
    public Boolean removeShip(Long id);
    public Boolean changeShip(Ship ship);
    public Boolean checkIsReserved(Ship ship);
    public Boolean removeHotOffer(Ship ship);
    public Boolean addHotOfferToShip(Ship ship);
    public Boolean uploadImg( MultipartFile file);
    public Ship addShip(Ship ship);
    public boolean isReserved(Long id);
    public Boolean removeShipByAdministrator(Long id);
    public boolean isShipAvailable(long id, LocalDateTime from, LocalDateTime to, int numOfGuests);
    public boolean isReservedFromTill(long id, LocalDateTime from, LocalDateTime to);
    }
