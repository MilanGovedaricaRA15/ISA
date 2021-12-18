package com.izdajMe.izdajMe.dto;

import com.izdajMe.izdajMe.model.Penalty;

import java.time.LocalDateTime;

public class PenaltyDTO {

    private long id;
    private LocalDateTime date;

    public PenaltyDTO(){}
    public PenaltyDTO(Penalty penalty){
        this.id = penalty.getId();
        this.date = penalty.getDate();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
