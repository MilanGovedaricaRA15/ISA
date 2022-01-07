package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class InstructorsFavorDTO {
    protected long id;
    private User instructor;
    private String name;
    private String address;
    private String description;
    private List<Grade> grades;
    private ArrayList<String> images;
    private int numOfPersons;
    private List<FavorHotOffer> hotOffers;
    private String rules;
    private ArrayList<InstructorsFavor.FavorServices> services;
    private List<FavorServicePrice> priceList;
    private float cost;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private String cancellationCondition;

    public InstructorsFavorDTO() {}

    public InstructorsFavorDTO(InstructorsFavor instructorsFavor) {
        this.id = instructorsFavor.getId();
        this.instructor = instructorsFavor.getInstructor();
        this.name = instructorsFavor.getName();
        this.address = instructorsFavor.getAddress();
        this.description = instructorsFavor.getDescription();
        this.grades = instructorsFavor.getGrades();
        this.images = instructorsFavor.getImages();
        this.numOfPersons = instructorsFavor.getNumOfPersons();
        this.hotOffers = instructorsFavor.getHotOffers();
        this.rules = instructorsFavor.getRules();
        this.services = instructorsFavor.getServices();
        this.priceList = instructorsFavor.getPriceList();
        this.cost = instructorsFavor.getCost();
        this.availableFrom = instructorsFavor.getAvailableFrom();
        this.availableTill = instructorsFavor.getAvailableTill();
        this.cancellationCondition = instructorsFavor.getCancellationCondition();
    }

    public long getId() { return this.id; }

    public void setId(long id) { this.id = id; }

    public User getInstructor() { return this.instructor; }

    public void setInstructor(User instructor) { this.instructor = instructor; }

    public String getName() { return this.name; }

    public void setName(String name) { this.name = name; }

    public String getAddress() { return this.address; }

    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return this.description; }

    public void setDescription(String description) { this.description = description; }

    public List<Grade> getGrades() { return this.grades; }

    public void setGrades(List<Grade> grades) { this.grades = grades; }

    public ArrayList<String> getImages() { return this.images; }

    public void setImages(ArrayList<String> images) { this.images = images; }

    public int getNumOfPersons() { return this.numOfPersons; }

    public void setNumOfPersons(int numOfPersons) { this.numOfPersons = numOfPersons; }

    public List<FavorHotOffer> getHotOffers() { return this.hotOffers; }

    public void setHotOffers(List<FavorHotOffer> hotOffers) { this.hotOffers = hotOffers; }

    public String getRules() { return this.rules; }

    public void setRules(String rules) { this.rules = rules; }

    public ArrayList<InstructorsFavor.FavorServices> getServices() { return this.services; }

    public void setServices(ArrayList<InstructorsFavor.FavorServices> services) { this.services = services; }

    public List<FavorServicePrice> getPriceList() { return this.priceList; }

    public void setPriceList(List<FavorServicePrice> priceList) { this.priceList = priceList; }

    public float getCost() { return cost; }

    public void setCost(float cost) { this.cost = cost; }

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

    public String getCancellationCondition() { return this.cancellationCondition; }

    public void setCancellationCondition(String cancellationCondition) { this.cancellationCondition = cancellationCondition; }
}
