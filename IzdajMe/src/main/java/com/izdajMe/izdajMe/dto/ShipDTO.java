package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ShipDTO {
    private long id;
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
    private List<ShipServicePrice> priceList;
    private List<Grade> grades;
    private float costPerNight;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTill;
    private ArrayList<Ship.Services> services;
    private List<ShipHotOffer> hotOffers;

    public ShipDTO(){

    }

    public ShipDTO(Ship ship) {
        this.id = ship.getId();
        this.owner = ship.getOwner();
        this.name = ship.getName();
        this.type = ship.getType();
        this.length = ship.getLength();
        this.engineNumber = ship.getEngineNumber();
        this.enginePower = ship.getEnginePower();
        this.topSpeed = ship.getTopSpeed();
        this.navigationEquipment = ship.getNavigationEquipment();
        this.address = ship.getAddress();
        this.description = ship.getDescription();
        this.images = ship.getImages();
        this.capacity = ship.getCapacity();
        this.rules = ship.getRules();
        this.fishingEquipment = ship.getFishingEquipment();
        this.cancelRequirements = ship.getCancelRequirements();
        this.priceList = ship.getPriceList();
        this.grades = ship.getGrades();
        this.costPerNight = ship.getCostPerNight();
        this.availableFrom = ship.getAvailableFrom();
        this.availableTill = ship.getAvailableTill();
        this.services = ship.getServices();
        this.hotOffers = ship.getHotOffers();
    }

    public List<ShipHotOffer> getHotOffers() {
        return hotOffers;
    }

    public void setHotOffers(List<ShipHotOffer> hotOffers) {
        this.hotOffers = hotOffers;
    }

    public ArrayList<Ship.Services> getServices() {
        return services;
    }

    public void setServices(ArrayList<Ship.Services> services) {
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

    public List<Grade> getGrades() {
        return grades;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
    }

    public float getCostPerNight() {
        return costPerNight;
    }

    public void setCostPerNight(float costPerNight) {
        this.costPerNight = costPerNight;
    }
}
