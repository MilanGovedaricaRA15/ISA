package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.FavorReservation;
import com.izdajMe.izdajMe.model.InstructorsFavor;
import com.izdajMe.izdajMe.model.User;

import java.time.LocalDateTime;

public class FavorReservationDTO {
    protected long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private float cost;
    private User client;
    private InstructorsFavor favor;

    public FavorReservationDTO() {}

    public FavorReservationDTO(FavorReservation favorReservation) {
        this.id = favorReservation.getId();
        this.availableFrom = favorReservation.getAvailableFrom();
        this.availableTill = favorReservation.getAvailableTill();
        this.cost = favorReservation.getCost();
        this.client = favorReservation.getClient();
        this.favor = favorReservation.getFavor();
    }

    public long getId() { return this.id; }

    public void setId(long id) { this.id = id; }

    public LocalDateTime getAvailableFrom() { return this.availableFrom; }

    public void setAvailableFrom(LocalDateTime availableFrom) { this.availableFrom = availableFrom; }

    public LocalDateTime getAvailableTill() { return this.availableTill; }

    public void setAvailableTill(LocalDateTime availableTill) { this.availableTill = availableTill; }

    public float getCost() { return this.cost; }

    public void setCost(float cost) { this.cost = cost; }

    public User getClient() { return this.client; }

    public void setClient(User client) { this.client = client; }

    public InstructorsFavor getFavor() { return this.favor; }

    public void setFavor(InstructorsFavor favor) { this.favor = favor; }
}
