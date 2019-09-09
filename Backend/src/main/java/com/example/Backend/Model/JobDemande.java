package com.example.Backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@NoArgsConstructor
@Table(name = "job_demandes")
public class JobDemande extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jobOffer_id")
    private JobOffer jobOffer;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cv_id", nullable = true)
    private CV cv;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise_id")
    private User enterprise;

    @OneToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @NotBlank
    private String status;

    private boolean confirmedByUser;

    public JobDemande(
            JobOffer jobOffer,
            CV cv,
            User enterprise,
            User sender,
            String status
    ) {
        this.jobOffer = jobOffer;
        this.cv = cv;
        this.enterprise = enterprise;
        this.sender = sender;
        this.status = status;
    }
    public boolean isConfirmedByEntreprise() {
        return confirmedByEntreprise;
    }

    public void setConfirmedByEntreprise(boolean confirmedByEntreprise) {
        this.confirmedByEntreprise = confirmedByEntreprise;
    }

    private boolean confirmedByEntreprise;

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