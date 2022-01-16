package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name="favorReservations")
public class FavorReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private ArrayList<InstructorsFavor.FavorServices> services;
    private float cost;
    @ManyToOne
    private User client;
    @ManyToOne
    private InstructorsFavor favor;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval=true)
    private Report report;

    public FavorReservation() {}

    public FavorReservation(long id, Report report, LocalDateTime availableFrom, LocalDateTime availableTill,
                            ArrayList<InstructorsFavor.FavorServices> services, float cost, User client, InstructorsFavor favor) {
        this.id = id;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.services = services;
        this.cost = cost;
        this.client = client;
        this.favor = favor;
        this.report = report;
    }

    public long getId() { return this.id; }

    public void setId(long id) { this.id = id; }

    public LocalDateTime getAvailableFrom() { return this.availableFrom; }

    public void setAvailableFrom(LocalDateTime availableFrom) { this.availableFrom = availableFrom; }

    public LocalDateTime getAvailableTill() { return this.availableTill; }

    public void setAvailableTill(LocalDateTime availableTill) { this.availableTill = availableTill; }

    public ArrayList<InstructorsFavor.FavorServices> getServices() { return this.services; }

    public void setServices(ArrayList<InstructorsFavor.FavorServices> services) { this.services = services; }

    public float getCost() { return this.cost; }

    public void setCost(float cost) { this.cost = cost; }

    public User getClient() { return this.client; }

    public void setClient(User client) { this.client = client; }

    public InstructorsFavor getFavor() { return this.favor; }

    public void setFavor(InstructorsFavor favor) { this.favor = favor; }

    public Report getReport() { return this.report; }

    public void setReport(Report report) { this.report = report; }
}
