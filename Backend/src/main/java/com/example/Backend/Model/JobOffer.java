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

    private String activity;

    private String type;

    private String time;

    private String startingDate;

    private Double wage;

    private String description;

    private String minimumSchoolDegree;

    private int experienceYears;

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

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(String startingDate) {
        this.startingDate = startingDate;
    }

    public Double getWage() {
        return wage;
    }

    public void setWage(Double wage) {
        this.wage = wage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMinimumSchoolDegree() {
        return minimumSchoolDegree;
    }

    public void setMinimumSchoolDegree(String minimumSchoolDegree) {
        this.minimumSchoolDegree = minimumSchoolDegree;
    }

    public int getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(int experienceYears) {
        this.experienceYears = experienceYears;
    }

    public Set<JobDemande> getJobRequests() {
        return jobRequests;
    }

    public void setJobRequests(Set<JobDemande> jobRequests) {
        this.jobRequests = jobRequests;
    }
}
