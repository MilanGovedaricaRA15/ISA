package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ships")
public class Ship {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    private User owner;
    private String name;
    private String type;
    private float length;
    private String engineNumber;
    private float enginePower;
    private float topSpeed;
    private ArrayList<NavigationEquipment> navigationEquipment;
    private String address;
    private String description;
    private ArrayList<String> images;
    private int capacity;
    private String rules;
    private ArrayList<FishingEquipment> fishingEquipment;
    private String cancelRequirements;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShipServicePrice> priceList;
    private float costPerNight;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private ArrayList<Services> services;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShipHotOffer> hotOffers;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Grade> grades;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> subscribedUsers;

    public Ship() {}

    public enum Services {
        PetFriendly,
        Minibar,
        HairDryer
    }

    public Ship(long id, List<ShipHotOffer> hotOffers, ArrayList<Services> services, User owner, String name, String type, float length,
                String engineNumber, float enginePower, float topSpeed, ArrayList<NavigationEquipment> navigationEquipment, String address,
                String description, ArrayList<String> images, int capacity, String rules, ArrayList<FishingEquipment> fishingEquipment,
                String cancelRequirements, List<ShipServicePrice> priceList, float costPerNight, LocalDateTime availableFrom, LocalDateTime availableTill,
                List<Grade> grades, List<User> subscribedUsers) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.type = type;
        this.length = length;
        this.engineNumber = engineNumber;
        this.enginePower = enginePower;
        this.topSpeed = topSpeed;
        this.navigationEquipment = navigationEquipment;
        this.address = address;
        this.description = description;
        this.images = images;
        this.capacity = capacity;
        this.rules = rules;
        this.fishingEquipment = fishingEquipment;
        this.cancelRequirements = cancelRequirements;
        this.priceList = priceList;
        this.costPerNight = costPerNight;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.services = services;
        this.hotOffers = hotOffers;
        this.grades = grades;
        this.subscribedUsers = subscribedUsers;
    }

    public List<ShipHotOffer> getHotOffers() {
        return hotOffers;
    }

    public void setHotOffers(List<ShipHotOffer> hotOffers) {
        this.hotOffers = hotOffers;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }

    public String getEngineNumber() {
        return engineNumber;
    }

    public void setEngineNumber(String engineNumber) {
        this.engineNumber = engineNumber;
    }

    public float getEnginePower() {
        return enginePower;
    }

    public void setEnginePower(float enginePower) {
        this.enginePower = enginePower;
    }

    public float getTopSpeed() {
        return topSpeed;
    }

    public void setTopSpeed(float topSpeed) {
        this.topSpeed = topSpeed;
    }

    public ArrayList<NavigationEquipment> getNavigationEquipment() {
        return navigationEquipment;
    }

    public void setNavigationEquipment(ArrayList<NavigationEquipment> navigationEquipment) {
        this.navigationEquipment = navigationEquipment;
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

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public ArrayList<FishingEquipment> getFishingEquipment() {
        return fishingEquipment;
    }

    public void setFishingEquipment(ArrayList<FishingEquipment> fishingEquipment) {
        this.fishingEquipment = fishingEquipment;
    }

    public String getCancelRequirements() {
        return cancelRequirements;
    }

    public void setCancelRequirements(String cancelRequirements) {
        this.cancelRequirements = cancelRequirements;
    }

    public List<ShipServicePrice> getPriceList() {
        return priceList;
    }

    public void setPriceList(List<ShipServicePrice> priceList) {
        this.priceList = priceList;
    }

    public float getCostPerNight() {
        return costPerNight;
    }

    public void setCostPerNight(float costPerNight) {
        this.costPerNight = costPerNight;
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
