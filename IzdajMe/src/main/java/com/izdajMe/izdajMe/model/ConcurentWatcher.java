package com.izdajMe.izdajMe.model;

import javax.persistence.*;

@Entity
@Table(name = "concurentWatcher")
public class ConcurentWatcher {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String tableName;
    private Boolean isWriting;

    public ConcurentWatcher() {
    }

    public ConcurentWatcher(long id, String tableName, Boolean isWriting) {
        this.id = id;
        this.tableName = tableName;
        this.isWriting = isWriting;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Boolean getWriting() {
        return isWriting;
    }

    public void setWriting(Boolean writing) {
        isWriting = writing;
    }
}
