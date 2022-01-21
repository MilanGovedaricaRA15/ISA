package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.*;

import javax.persistence.CascadeType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CottageDTO {

    private long id;
    private User owner;
    private String name;
    private String address;
    private String description;
    private ArrayList<String> images;
    private int numOfRooms;
    private int numOfBeds;
    private String rules;
    private ArrayList<Cottage.Services> services;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private List<HotOffer> hotOffers;
    private float costPerNight;
    private List<ServicePrice> priceList;
    private List<Grade> grades;
    private List<User> subscribedUsers;

    public CottageDTO(){}
    public CottageDTO(Cottage cottage){
        this.id = cottage.getId();
        this.owner = cottage.getOwner();
        this.name = cottage.getName();
        this.address = cottage.getAddress();
        this.description = cottage.getDescription();
        this.images = cottage.getImages();
        this.numOfRooms = cottage.getNumOfRooms();
        this.numOfBeds = cottage.getNumOfBeds();
        this.rules = cottage.getRules();
        this.services = cottage.getServices();
        this.availableFrom = cottage.getAvailableFrom();
        this.availableTill = cottage.getAvailableTill();
        this.hotOffers = cottage.getHotOffers();
        this.costPerNight = cottage.getCostPerNight();
        this.priceList = cottage.getPriceList();
        this.grades = cottage.getGrades();
        this.subscribedUsers = cottage.getSubscribedUsers();
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

    public ArrayList<Cottage.Services> getServices() {
        return services;
    }

    public void setServices(ArrayList<Cottage.Services> services) {
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

    public List<Grade> getGrades() {
        return grades;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
    }

    public List<User> getSubscribedUsers() {
        return subscribedUsers;
    }

    public void setSubscribedUsers(List<User> subscribedUsers) {
        this.subscribedUsers = subscribedUsers;
    }
}
