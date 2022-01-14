package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cottages")
public class Cottage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    private User owner;
    private String name;
    private String address;
    private String description;
    private ArrayList<String> images;
    private int numOfRooms;
    private int numOfBeds;
    private String rules;
    private ArrayList<Services> services;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HotOffer> hotOffers;
    private float costPerNight;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServicePrice> priceList;
    @OneToMany
    private List<Grade> grades;

    public Cottage(long id, List<Grade> grades, User owner, String name, String address, String description, ArrayList<String> images, int numOfRooms, int numOfBeds, String rules, ArrayList<Services> services, LocalDateTime availableFrom, LocalDateTime availableTill, List<HotOffer> hotOffers, float costPerNight, List<ServicePrice> priceList) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.address = address;
        this.description = description;
        this.images = images;
        this.numOfRooms = numOfRooms;
        this.numOfBeds = numOfBeds;
        this.rules = rules;
        this.services = services;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.hotOffers = hotOffers;
        this.costPerNight = costPerNight;
        this.priceList = priceList;
        this.grades = grades;
    }

    public List<Grade> getGrades() {
        return grades;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
    }

    public Cottage() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList<String> getImages() {
        return images;
    }

    public void setImages(ArrayList<String> images) {
        this.images = images;
    }

    public int getNumOfRooms() {
        return numOfRooms;
    }

    public void setNumOfRooms(int numOfRooms) {
        this.numOfRooms = numOfRooms;
    }

    public int getNumOfBeds() {
        return numOfBeds;
    }

    public void setNumOfBeds(int numOfBeds) {
        this.numOfBeds = numOfBeds;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public ArrayList<Services> getServices() {
        return services;
    }

    public void setServices(ArrayList<Services> services) {
        this.services = services;
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

    public List<HotOffer> getHotOffers() {
        return hotOffers;
    }

    public void setHotOffers(List<HotOffer> hotOffers) {
        this.hotOffers = hotOffers;
    }

    public float getCostPerNight() {
        return costPerNight;
    }

    public void setCostPerNight(float costPerNight) {
        this.costPerNight = costPerNight;
    }

    public List<ServicePrice> getPriceList() {
        return priceList;
    }

    public void setPriceList(List<ServicePrice> priceList) {
        this.priceList = priceList;
    }

    public enum Services {
        WiFi,
        Parking,
        Pool
    }

    @Override
    public String toString() {
        return "Cottage{" +
                "id=" + id +
                ", owner=" + owner +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", description='" + description + '\'' +
                ", images=" + images +
                ", numOfRooms=" + numOfRooms +
                ", numOfBeds=" + numOfBeds +
                ", rules='" + rules + '\'' +
                ", services=" + services +
                ", availableFrom=" + availableFrom +
                ", availableTill=" + availableTill +
                ", hotOffers=" + hotOffers +
                ", costPerNight=" + costPerNight +
                '}';
    }
}

