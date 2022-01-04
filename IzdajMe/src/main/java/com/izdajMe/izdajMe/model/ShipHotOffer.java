package com.izdajMe.izdajMe.model;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name="shipHotOffers")
public class ShipHotOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private int numOfPeople;
    private ArrayList<Ship.Services> services;
    private float cost;
    private Boolean free;

    public  ShipHotOffer(){

    }

    public ShipHotOffer(long id, LocalDateTime availableFrom, LocalDateTime availableTill, int numOfPeople, ArrayList<Ship.Services> services, float cost, Boolean free) {
        this.id = id;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.numOfPeople = numOfPeople;
        this.services = services;
        this.cost = cost;
        this.free = free;
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

    public int getNumOfPeople() {
        return numOfPeople;
    }

    public void setNumOfPeople(int numOfPeople) {
        this.numOfPeople = numOfPeople;
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

    public Boolean getFree() {
        return free;
    }

    public void setFree(Boolean free) {
        this.free = free;
    }
}
