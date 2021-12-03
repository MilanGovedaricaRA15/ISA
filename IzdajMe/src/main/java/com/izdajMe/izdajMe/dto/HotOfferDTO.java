package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.HotOffer;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class HotOfferDTO {
    private long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private int numOfPeople;
    private ArrayList<Cottage.Services> services;
    private float cost;
    private Boolean free;

    public HotOfferDTO(){}
    public HotOfferDTO(HotOffer hotOffer){
        this.id = hotOffer.getId();
        this.availableFrom = hotOffer.getAvailableFrom();
        this.availableTill = hotOffer.getAvailableTill();
        this.numOfPeople = hotOffer.getNumOfPeople();
        this.services = hotOffer.getServices();
        this.cost = hotOffer.getCost();
        this.free = hotOffer.getFree();
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

    public ArrayList<Cottage.Services> getServices() {
        return services;
    }

    public void setServices(ArrayList<Cottage.Services> services) {
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
