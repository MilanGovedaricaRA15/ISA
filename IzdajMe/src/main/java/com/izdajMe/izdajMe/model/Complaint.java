package com.izdajMe.izdajMe.model;

import javax.persistence.*;

@Entity
@Table(name="complaints")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    private User user;
    private String text;

    public Complaint() {}

    public Complaint(long id, User user, String text) {
        this.id = id;
        this.user = user;
        this.text = text;
    }

    public long getId() { return id; }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
