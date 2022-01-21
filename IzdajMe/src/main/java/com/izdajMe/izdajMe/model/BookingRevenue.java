package com.izdajMe.izdajMe.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="revenues")
public class BookingRevenue {
    @Id
    protected long id;
    protected int numOfRevenueRegular;
    protected int numOfRevenueSilver;
    protected int numOfRevenueGold;

    public BookingRevenue() {}

    public BookingRevenue(long id, int numOfRevenueRegular, int numOfRevenueSilver, int numOfRevenueGold) {
        this.id = id;
        this.numOfRevenueRegular = numOfRevenueRegular;
        this.numOfRevenueSilver = numOfRevenueSilver;
        this.numOfRevenueGold = numOfRevenueGold;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getNumOfRevenueRegular() {
        return numOfRevenueRegular;
    }

    public void setNumOfRevenueRegular(int numOfRevenueRegular) {
        this.numOfRevenueRegular = numOfRevenueRegular;
    }

    public int getNumOfRevenueSilver() {
        return numOfRevenueSilver;
    }

    public void setNumOfRevenueSilver(int numOfRevenueSilver) {
        this.numOfRevenueSilver = numOfRevenueSilver;
    }

    public int getNumOfRevenueGold() {
        return numOfRevenueGold;
    }

    public void setNumOfRevenueGold(int numOfRevenueGold) {
        this.numOfRevenueGold = numOfRevenueGold;
    }
}
