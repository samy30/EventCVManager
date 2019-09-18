package com.example.Backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Table(name = "jobs")
public class Job extends AuditModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @JsonBackReference
    @OneToMany(mappedBy = "job")
    private Set<JobOffer> jobOffers = new HashSet<>();

    public Job(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<JobOffer> getJobOffers() {
        return jobOffers;
    }

    public void setJobOffers(Set<JobOffer> jobOffers) {
        this.jobOffers = jobOffers;
    }
}