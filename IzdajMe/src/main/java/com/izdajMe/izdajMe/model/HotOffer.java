package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;


@Entity
@Table(name="hotOffers")
public class HotOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private int numOfPeople;
    private ArrayList<Cottage.Services> services;
    private float costPerNight;
    private Boolean free;

    public HotOffer(long id, LocalDateTime availableFrom, LocalDateTime availableTill, int numOfPeople, ArrayList<Cottage.Services> services, float costPerNight) {
        this.id = id;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.numOfPeople = numOfPeople;
        this.services = services;
        this.costPerNight = costPerNight;
        this.free = true;
    }

    public HotOffer(){}

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

    public ArrayList<Cottage.Services> getServices() {
        return services;
    }

    public void setServices(ArrayList<Cottage.Services> services) {
        this.services = services;
    }

    public float getCostPerNight() {
        return costPerNight;
    }

    public void setCostPerNight(float costPerNight) {
        this.costPerNight = costPerNight;
    }

    public Boolean getFree() {
        return free;
    }

    public void setFree(Boolean free) {
        this.free = free;
    }
}
