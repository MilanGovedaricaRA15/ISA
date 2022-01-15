package com.izdajMe.izdajMe.model;

import javax.persistence.*;

@Entity
@Table(name = "ship_service_price")
public class ShipServicePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Ship.Services service;
    private float cost;

    public ShipServicePrice() {

    }

    public ShipServicePrice(long id, Ship.Services service, float cost) {
        this.id = id;
        this.service = service;
        this.cost = cost;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Ship.Services getService() {
        return service;
    }

    public void setService(Ship.Services service) {
        this.service = service;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }
}
