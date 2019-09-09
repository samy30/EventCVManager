package com.example.Backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Table(name = "job_offers")
public class JobOffer extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
    @JoinColumn(name = "job_id", nullable = false)
    @OneToOne(cascade = CascadeType.MERGE)
    private Job job;

    private String[] skills;

    private String town ;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise_id")
    private User enterprise;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "jobOffer")
    private Set<JobDemande> jobRequests = new HashSet<>();

    public JobOffer(Job job, String[] skills, String town, User enterprise) {
        this.job = job;
        this.skills = skills;
        this.town = town;
        this.enterprise = enterprise;
    }


//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(job = "needed_job__id", nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonBackReference
//    private NeededJob neededJob;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
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

    public Set<JobDemande> getJobRequests() {
        return jobRequests;
    }

    public void setJobRequests(Set<JobDemande> jobRequests) {
        this.jobRequests = jobRequests;
    }


}
