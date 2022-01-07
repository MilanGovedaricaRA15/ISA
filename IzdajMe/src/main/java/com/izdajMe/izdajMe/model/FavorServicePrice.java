package com.izdajMe.izdajMe.model;

import javax.persistence.*;

@Entity
@Table(name="favorServicePrice")
public class FavorServicePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;

    private InstructorsFavor.FavorServices service;
    private float cost;

    public FavorServicePrice() {}

    public FavorServicePrice(long id, InstructorsFavor.FavorServices service, float cost) {
        this.id = id;
        this.service = service;
        this.cost = cost;
    }

    public long getId() { return this.id; }

    public void setId(long id) { this.id = id; }

    public InstructorsFavor.FavorServices getService() { return this.service; }

    public void setService(InstructorsFavor.FavorServices service) { this.service = service; }

    public float getCost() { return this.cost; }

    public void setCost(float cost) { this.cost = cost; }
}
