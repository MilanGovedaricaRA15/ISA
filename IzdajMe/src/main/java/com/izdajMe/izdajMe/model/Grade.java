package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="grades")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    private int value;
    private String comment;
    private Boolean seen;

    public Grade() {}

    public Grade(long id, User user, int value, String comment) {
        this.id = id;
        this.user = user;
        this.value = value;
        this.comment = comment;
        seen = false;
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

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Boolean getSeen() { return seen; }

    public void setSeen(Boolean seen) { this.seen = seen; }

    @Override
    public String toString() {
        return "Grade{" +
                "id=" + id +
                ", user=" + user +
                ", value=" + value +
                ", comment='" + comment + '\'' +
                '}';
    }
}
