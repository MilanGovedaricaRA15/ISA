package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.User;

public class UserDTO {

    protected long id;
    protected String firstName;
    protected String lastName;
    protected String mobileNumber;
    protected String address;
    protected String country;
    protected String city;
    protected String email;
    protected User.Role role;
    protected String password;
    protected String reason;
    protected boolean verified;

    public UserDTO(){}

    public UserDTO(User user){
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.mobileNumber = user.getMobileNumber();
        this.address = user.getAddress();
        this.country = user.getCountry();
        this.city = user.getCity();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.password = user.getPassword();
        this.reason = user.getReason();
        this.verified = user.isVerified();
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User.Role getRole() {
        return role;
    }

    public void setRole(User.Role role) {
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

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }
}