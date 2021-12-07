package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.Administrator;

public class AdministratorDTO {

    protected long id;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected String mobileNumber;
    protected String address;
    protected Boolean superior;
    protected Boolean firstLogged;
    protected String password;

    public AdministratorDTO() {}

    public AdministratorDTO(Administrator administrator) {
        this.id = administrator.getId();
        this.firstName = administrator.getFirstName();
        this.lastName = administrator.getLastName();
        this.email = administrator.getEmail();
        this.mobileNumber = administrator.getMobileNumber();
        this.address = administrator.getAddress();
        this.superior = administrator.getSuperior();
        this.firstLogged = administrator.getFirstLogged();
        this.password = administrator.getPassword();
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
