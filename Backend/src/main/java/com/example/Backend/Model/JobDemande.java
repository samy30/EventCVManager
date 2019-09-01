package com.example.Backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "job_demandes")
public class JobDemande extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "job_offer__id", nullable = false)
    private JobOffer jobOffer;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cv_id", nullable = false)
    private CV cv;

    @JoinColumn(name = "enterprise_id")
    @OneToOne(cascade = CascadeType.MERGE)
    private User enterprise;

    @JoinColumn(name = "sender_id")
    @OneToOne(cascade = CascadeType.MERGE)
    private User sender;

    @NotBlank
    private String status;

    @NotBlank
    private boolean seenByEnterprise;
    @NotBlank
    private boolean seenByUser;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public JobOffer getJobOffer() {
        return jobOffer;
    }

    public void setJobOffer(JobOffer jobOffer) {
        this.jobOffer = jobOffer;
    }

    public CV getCv() {
        return cv;
    }

    public void setCv(CV cv) {
        this.cv = cv;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isSeenByEnterprise() {
        return seenByEnterprise;
    }

    public void setSeenByEnterprise(boolean seenByEnterprise) {
        this.seenByEnterprise = seenByEnterprise;
    }

    public boolean isSeenByUser() {
        return seenByUser;
    }

    public void setSeenByUser(boolean seenByUser) {
        this.seenByUser = seenByUser;
    }

    public User getEnterprise() {
        return enterprise;
    }

    public void setEnterprise(User enterprise) {
        this.enterprise = enterprise;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }
}