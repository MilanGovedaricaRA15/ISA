package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "service_price")
public class ServicePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Cottage.Services service;
    private float cost;

    public ServicePrice(long id, Cottage.Services service, float cost) {
        this.id = id;
        this.service = service;
        this.cost = cost;
    }

    public ServicePrice() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Cottage.Services getService() {
        return service;
    }

    public void setService(Cottage.Services service) {
        this.service = service;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }
}
