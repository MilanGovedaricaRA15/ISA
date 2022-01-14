package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name = "shipReservations")
public class ShipReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private ArrayList<Ship.Services> services;
    private float cost;
    @ManyToOne
    private User client;
    @ManyToOne
    private Ship ship;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Penalty penalty;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Report report;

    public ShipReservation() {
    }

    public ShipReservation(long id, Report report, Penalty penalty, LocalDateTime availableFrom, LocalDateTime availableTill, ArrayList<Ship.Services> services, float cost, User client, Ship ship) {
        this.id = id;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.services = services;
        this.cost = cost;
        this.client = client;
        this.ship = ship;
        this.report = report;
        this.penalty = penalty;
    }

    public Penalty getPenalty() {
        return penalty;
    }

    public void setPenalty(Penalty penalty) {
        this.penalty = penalty;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
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
