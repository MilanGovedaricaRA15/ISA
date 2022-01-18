package com.izdajMe.izdajMe.model;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name = "cottageReservations")
public class CottageReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private ArrayList<Cottage.Services> services;
    private float cost;
    @ManyToOne
    private User client;
    @ManyToOne
    private Cottage cottage;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Penalty penalty;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Report report;

    public CottageReservation(long id, Report report, Penalty penalty, LocalDateTime availableFrom, LocalDateTime availableTill, float cost, User client, Cottage cottage, ArrayList<Cottage.Services> services) {
        this.id = id;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.cost = cost;
        this.client = client;
        this.cottage = cottage;
        this.services = services;
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

    public CottageReservation() {
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

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public User getClient() {return client;}

    public void setClient(User client) {
        this.client = client;
    }

    public Cottage getCottage() {
        return cottage;
    }

    public void setCottage(Cottage cottage) {
        this.cottage = cottage;
    }

    public ArrayList<Cottage.Services> getServices() {
        return services;
    }

    public void setServices(ArrayList<Cottage.Services> services) {
        this.services = services;
    }
}
