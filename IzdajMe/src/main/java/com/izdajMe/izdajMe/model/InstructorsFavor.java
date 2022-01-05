package com.izdajMe.izdajMe.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="favors")
public class InstructorsFavor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;
    @ManyToOne
    private User instructor;
    private String name;
    private String address;
    private String description;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
    private List<Grade> grades;

    public InstructorsFavor() {}

    public InstructorsFavor(long id, User instructor, String name, String address, String description, List<Grade> grades) {
        this.id = id;
        this.instructor = instructor;
        this.name = name;
        this.address = address;
        this.description = description;
        this.grades = grades;
    }

    public long getId() { return this.id; }

    public void setId(long id) { this.id = id; }

    public User getInstructor() { return this.instructor; }

    public void setInstructor(User instructor) { this.instructor = instructor; }

    public String getName() { return this.name; }

    public void setName(String name) { this.name = name; }

    public String getAddress() { return this.address; }

    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return this.description; }

    public void setDescription(String description) { this.description = description; }

    public List<Grade> getGrades() { return this.grades; }

    public void setId(List<Grade> grades) { this.grades = grades; }
}
