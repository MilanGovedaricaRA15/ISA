package com.izdajMe.izdajMe.model;

import javax.persistence.*;

@Entity
@Table(name="complaints")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    private User author;
    @ManyToOne
    private User complaintUser;
    private String text;
    private String answer;
    @ManyToOne
    private Cottage complaintCottage;
    @ManyToOne
    private Ship complaintShip;

    public Complaint() {}

    public Complaint(long id, User author, User complaintUser, String text) {
        this.id = id;
        this.author = author;
        this.complaintUser = complaintUser;
        this.text = text;
    }

    public long getId() { return id; }

    public void setId(long id) {
        this.id = id;
    }

    public User getAuthor() { return author; }

    public void setAuthor(User author) { this.author = author; }

    public User getComplaintUser() { return complaintUser; }

    public void setComplaintUser(User complaintUser) { this.complaintUser = complaintUser; }

    public Cottage getComplaintCottage() {
        return complaintCottage;
    }

    public void setComplaintCottage(Cottage complaintCottage) {
        this.complaintCottage = complaintCottage;
    }

    public Ship getComplaintShip() {
        return complaintShip;
    }

    public void setComplaintShip(Ship complaintShip) {
        this.complaintShip = complaintShip;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAnswer() { return answer; }

    public void setAnswer(String answer) { this.answer = answer; }
}
