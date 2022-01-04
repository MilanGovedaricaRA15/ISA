package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.*;

import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class CottageReservationDTO {

    private long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private ArrayList<Cottage.Services> services;
    private float cost;
    private User client;
    private Cottage cottage;
    private Report report;
    private Penalty penalty;

    public CottageReservationDTO(){}

    public CottageReservationDTO(CottageReservation cottageReservation){
        this.id = cottageReservation.getId();
        this.availableFrom = cottageReservation.getAvailableFrom();
        this.availableTill = cottageReservation.getAvailableTill();
        this.services = cottageReservation.getServices();
        this.cost = cottageReservation.getCost();
        this.client = cottageReservation.getClient();
        this.cottage = cottageReservation.getCottage();
        this.report = cottageReservation.getReport();
        this.penalty = cottageReservation.getPenalty();
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public Penalty getPenalty() {
        return penalty;
    }

    public void setPenalty(Penalty penalty) {
        this.penalty = penalty;
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

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Cottage getCottage() {
        return cottage;
    }

    public void setCottage(Cottage cottage) {
        this.cottage = cottage;
    }
}
