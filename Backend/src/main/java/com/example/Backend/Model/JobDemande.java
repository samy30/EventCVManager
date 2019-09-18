package com.example.Backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "job_demandes")
public class JobDemande extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "jobOffer_id")
    private JobOffer jobOffer;

    @JsonBackReference
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cv_id", nullable = true)
    private CV cv;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise_id")
    private User enterprise;

    @OneToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(columnDefinition = "BOOLEAN")
    private boolean confirmedByUser;

    @JsonManagedReference
    @OneToOne(mappedBy = "jobRequest")
    private InterviewSession interviewSession;

    public JobDemande(
            JobOffer jobOffer,
            CV cv,
            User enterprise,
            User sender,
            Status status
    ) {
        this.jobOffer = jobOffer;
        this.cv = cv;
        this.enterprise = enterprise;
        this.sender = sender;
        this.status = status;
    }

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

    public InterviewSession getInterviewSession() {
        return interviewSession;
    }

    public void setInterviewSession(InterviewSession interviewSession) {
        this.interviewSession = interviewSession;
    }

}