package com.izdajMe.izdajMe.model;

import javax.persistence.*;

@Entity
@Table(name="administrators")
public class Administrator {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected String mobileNumber;
    protected String address;
    protected Boolean superior;
    protected Boolean firstLogged;
    protected String password;

    public Administrator() {}

    public Administrator(long id, String firstName, String lastName, String email, String mobileNumber, String address, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.superior = false;
        this.firstLogged = true;
        this.password = password;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Boolean getSuperior() { return superior; }

    public void setSuperior(Boolean superior) { this.superior = superior; }

    public Boolean getFirstLogged() { return firstLogged; }

    public void setFirstLogged(Boolean firstLogged) { this.firstLogged = firstLogged; }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
