package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.Ship;
import com.izdajMe.izdajMe.model.ShipReservation;
import com.izdajMe.izdajMe.model.User;

import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class ShipReservationDTO {
    private long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private ArrayList<Ship.Services> services;
    private float cost;
    private User client;
    private Ship ship;

    public ShipReservationDTO(ShipReservation shipReservation) {
        this.id = shipReservation.getId();
        this.availableFrom = shipReservation.getAvailableFrom();
        this.availableTill = shipReservation.getAvailableTill();
        this.services = shipReservation.getServices();
        this.cost = shipReservation.getCost();
        this.client = shipReservation.getClient();
        this.ship = shipReservation.getShip();
    }

    public  ShipReservationDTO(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(LocalDateTime availableFrom) {
        this.availableFrom = availableFrom;
    }

    public LocalDateTime getAvailableTill() {
        return availableTill;
    }

    public void setAvailableTill(LocalDateTime availableTill) {
        this.availableTill = availableTill;
    }

    public ArrayList<Ship.Services> getServices() {
        return services;
    }

    public void setServices(ArrayList<Ship.Services> services) {
        this.services = services;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Ship getShip() {
        return ship;
    }

    public void setShip(Ship ship) {
        this.ship = ship;
    }
}
