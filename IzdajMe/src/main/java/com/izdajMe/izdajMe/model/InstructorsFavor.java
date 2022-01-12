package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="favors")
public class InstructorsFavor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;
    @ManyToOne
    private User instructor;
    private String name;
    private String address;
    private String description;
    private ArrayList<String> images;
    private int numOfPersons;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
    private List<FavorHotOffer> hotOffers;
    private String rules;
    private ArrayList<FavorServices> services;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
    private List<FavorServicePrice> priceList;
    private float cost;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private String cancellationCondition;

    public InstructorsFavor() {}

    public InstructorsFavor(long id, User instructor, String name, String address, String description, ArrayList<String> images,
                            int numOfPersons, String rules, ArrayList<FavorServices> services, float cost,
                            LocalDateTime availableFrom, LocalDateTime availableTill, String cancellationCondition) {
        this.id = id;
        this.instructor = instructor;
        this.name = name;
        this.address = address;
        this.description = description;
        this.images = images;
        this.numOfPersons = numOfPersons;
        this.rules = rules;
        this.services = services;
        this.cost = cost;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.cancellationCondition = cancellationCondition;
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

    public ArrayList<String> getImages() { return this.images; }

    public void setImages(ArrayList<String> images) { this.images = images; }

    public int getNumOfPersons() { return this.numOfPersons; }

    public void setNumOfPersons(int numOfPersons) { this.numOfPersons = numOfPersons; }

    public List<FavorHotOffer> getHotOffers() { return this.hotOffers; }

    public void setHotOffers(List<FavorHotOffer> hotOffers) { this.hotOffers = hotOffers; }

    public String getRules() { return this.rules; }

    public void setRules(String rules) { this.rules = rules; }

    public ArrayList<FavorServices> getServices() { return this.services; }

    public void setServices(ArrayList<FavorServices> services) { this.services = services; }

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

    public enum FavorServices {
        Boat,
        FishingRod
    }
}
