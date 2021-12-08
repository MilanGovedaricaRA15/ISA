package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name="ships")
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
    private NavigationEquipment navigationEquipment;
    private String address;
    private String description;
    private ArrayList<String> images;
    private int capacity;
    private ArrayList<String> rules;

    public Ship(long id, User owner, String name, String type, float length, String engineNumber, float enginePower, float topSpeed, NavigationEquipment navigationEquipment, String address, String description, ArrayList<String> images, int capacity, ArrayList<String> rules) {
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
    }

    public Ship() {}

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

    public NavigationEquipment getNavigationEquipment() {
        return navigationEquipment;
    }

    public void setNavigationEquipment(NavigationEquipment navigationEquipment) {
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

    public ArrayList<String> getRules() {
        return rules;
    }

    public void setRules(ArrayList<String> rules) {
        this.rules = rules;
    }

    @Override
    public String toString() {
        return "Ship{" +
                "id=" + id +
                ", owner=" + owner +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", length=" + length +
                ", engineNumber='" + engineNumber + '\'' +
                ", enginePower=" + enginePower +
                ", topSpeed=" + topSpeed +
                ", navigationEquipment=" + navigationEquipment +
                ", address='" + address + '\'' +
                ", description='" + description + '\'' +
                ", capacity=" + capacity +
                ", rules=" + rules +
                '}';
    }
}
