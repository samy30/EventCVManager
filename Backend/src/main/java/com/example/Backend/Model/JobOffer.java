package com.example.Backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "job_offers")
public class JobOffer extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "job_id")
    @OneToOne(cascade = CascadeType.MERGE)
    private Job name;

    private String[] skills;

    private String town ;

    @JoinColumn(name = "enterprise_id")
    @OneToOne(cascade = CascadeType.MERGE)
    private User enterprise;




//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "needed_job__id", nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonBackReference
//    private NeededJob neededJob;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Job getName() {
        return name;
    }

    public void setName(Job name) {
        this.name = name;
    }

    public String[] getSkills() {
        return skills;
    }

    public void setSkills(String[] skills) {
        this.skills = skills;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public User getEnterprise() {
        return enterprise;
    }

    public void setEnterprise(User enterprise) {
        this.enterprise = enterprise;
    }
}
