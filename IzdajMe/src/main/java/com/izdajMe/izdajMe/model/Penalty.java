package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="penalties")
public class Penalty {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private LocalDateTime date;

    public Penalty(){}

    public Penalty(long id, LocalDateTime date) {
        this.id = id;
        this.date = date;
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
