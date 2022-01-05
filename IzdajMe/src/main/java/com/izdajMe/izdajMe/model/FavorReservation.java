package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="favorReservations")
public class FavorReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private float cost;
    @ManyToOne
    private User client;
    @ManyToOne
    private InstructorsFavor favor;

    private FavorReservation() {}

    private FavorReservation(long id, LocalDateTime availableFrom, LocalDateTime availableTill, float cost, User client, InstructorsFavor favor) {
        this.id = id;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.cost = cost;
        this.client = client;
        this.favor = favor;
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
