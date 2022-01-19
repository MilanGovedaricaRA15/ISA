package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;
    protected String firstName;
    protected String lastName;
    protected String mobileNumber;
    protected String address;
    protected String country;
    protected String city;
    protected String email;
    public enum Role {
        cottageAdvertiser,
        boatAdvertiser,
        instructor,
        administratorSuperior,
        administratorFirstLogged,
        administrator,
        client
    }
    public enum Type {
        Regular,
        Silver,
        Gold
    }
    protected Role role;
    protected String password;
    protected String reason;
    protected boolean verified;
    protected Boolean prepaid;
    protected Type type;
    protected int points;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Grade> grades;

    public User(long id,String email, String firstName, String lastName, String mobileNumber, String address, String country, String city, Role role, String password, String reason, Boolean prepaid, Type type, List<Grade> grades) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.country = country;
        this.city = city;
        this.role = role;
        this.password = password;
        this.reason = reason;
        this.email = email;
        this.verified = false;
        this.prepaid = prepaid;
        this.type = type;
        this.points = 0;
        this.grades = grades;
    }

    public User(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public Boolean getPrepaid() { return prepaid; }

    public void setPrepaid(Boolean prepaid) { this.prepaid = prepaid; }

    public Type getType() { return type; }

    public void setType(Type type) { this.type = type; }

    public int getPoints() { return points; }

    public void setPoints(int points) { this.points = points; }

    public List<Grade> getGrades() {
        return grades;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
    }
}
