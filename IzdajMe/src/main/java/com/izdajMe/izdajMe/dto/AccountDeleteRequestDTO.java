package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.User;

import javax.persistence.ManyToOne;

public class AccountDeleteRequestDTO {

    private long id;
    private User user;
    private boolean seen;
    private String reason;

    public AccountDeleteRequestDTO(){}

    public AccountDeleteRequestDTO(AccountDeleteRequest accountDeleteRequest){
        this.id = accountDeleteRequest.getId();
        this.user = accountDeleteRequest.getUser();
        this.seen = accountDeleteRequest.isSeen();
        this.reason = accountDeleteRequest.getReason();
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }
}
