package com.example.Backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

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

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(columnDefinition = "BOOLEAN")
    private boolean confirmedByUser;


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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
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

    public boolean isConfirmedByUser() {
        return confirmedByUser;
    }

    public void setConfirmedByUser(boolean confirmedByUser) {
        this.confirmedByUser = confirmedByUser;
    }
}