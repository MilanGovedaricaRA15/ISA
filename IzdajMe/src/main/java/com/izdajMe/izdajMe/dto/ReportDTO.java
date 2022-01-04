package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.Report;

public class ReportDTO {
    private long id;
    private String report;
    private String comment;
    private String praise;
    private Boolean showedUp;
    private Boolean shouldGetPenalty;
    private Boolean verified;

    public ReportDTO(){}
    public ReportDTO(Report report){
        this.id = report.getId();
        this.report = report.getReport();
        this.comment =report.getComment();
        this.praise = report.getPraise();
        this.showedUp = report.getShowedUp();
        this.shouldGetPenalty = report.getShouldGetPenalty();
        this.verified = report.getVerified();
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
