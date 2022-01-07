package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name="favorHotOffers")
public class FavorHotOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private String place;
    private int numOfPersons;
    private ArrayList<InstructorsFavor.FavorServices> services;
    private float cost;
    private Boolean free;

    public FavorHotOffer() {}

    public FavorHotOffer(long id, LocalDateTime availableFrom, LocalDateTime availableTill, String place, int numOfPersons,
                         ArrayList<InstructorsFavor.FavorServices> services, float cost) {
        this.id = id;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.place = place;
        this.numOfPersons = numOfPersons;
        this.services = services;
        this.cost = cost;
        this.free = true;
    }

    public long getId() { return this.id; }

    public void setId(long id) { this.id = id; }

    public LocalDateTime getAvailableFrom() { return this.availableFrom; }

    public void setAvailableFrom(LocalDateTime availableFrom) { this.availableFrom = availableFrom; }

    public LocalDateTime getAvailableTill() { return this.availableTill; }

    public void setAvailableTill(LocalDateTime availableTill) { this.availableTill = availableTill; }

    public String getPlace() { return this.place; }

    public void setPlace(String place) { this.place = place; }

    public int getNumOfPersons() { return this.numOfPersons; }

    public void setNumOfPersons(int numOfPersons) { this.numOfPersons = numOfPersons; }

    public ArrayList<InstructorsFavor.FavorServices> getServices() { return this.services; }

    public void setServices(ArrayList<InstructorsFavor.FavorServices> services) { this.services = services; }

    public float getCost() { return this.cost; }

    public void setCost(float cost) { this.cost = cost; }

    public Boolean getFree() { return this.free; }

    public void setFree(Boolean free) { this.free = free; }
}
