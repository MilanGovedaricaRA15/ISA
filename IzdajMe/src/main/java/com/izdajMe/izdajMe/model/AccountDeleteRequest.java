package com.izdajMe.izdajMe.model;

import javax.persistence.*;

@Entity
@Table(name="accountDeleteRequests")
public class AccountDeleteRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    private User user;
    private String reason;
    private String answer;
    private boolean seen;

    public AccountDeleteRequest(long id, User user, boolean seen, String reason, String answer) {
        this.id = id;
        this.user = user;
        this.seen = seen;
        this.reason = reason;
        this.answer = answer;
    }

    public AccountDeleteRequest(){
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getAnswer() { return answer; }

    public void setAnswer(String answer) { this.answer = answer; }

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
