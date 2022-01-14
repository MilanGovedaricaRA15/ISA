package com.izdajMe.izdajMe.model;

import javax.persistence.*;

@Entity
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String report;
    private String comment;
    private String praise;
    private Boolean showedUp;
    private Boolean shouldGetPenalty;
    private Boolean verified;

    public Report() {
    }

    public Report(long id, String report, String comment, String praise, Boolean showedUp, Boolean shouldGetPenalty, Boolean verified) {
        this.id = id;
        this.report = report;
        this.comment = comment;
        this.praise = praise;
        this.showedUp = showedUp;
        this.shouldGetPenalty = shouldGetPenalty;
        this.verified = verified;
    }

    public Boolean getShouldGetPenalty() {
        return shouldGetPenalty;
    }

    public void setShouldGetPenalty(Boolean shouldGetPenalty) {
        this.shouldGetPenalty = shouldGetPenalty;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getPraise() {
        return praise;
    }

    public void setPraise(String praise) {
        this.praise = praise;
    }

    public Boolean getShowedUp() {
        return showedUp;
    }

    public void setShowedUp(Boolean showedUp) {
        this.showedUp = showedUp;
    }
}
