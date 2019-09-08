package com.example.Backend.Model;

import javax.persistence.*;

@Entity
@Table(name = "notifications")
public class Notification extends AuditModel{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderID;

    private Long receiverID;

    private Long jobOfferID;

    private Long jobDemandeID;

    @Enumerated(EnumType.STRING)
    private NotificationTypeName content;

    private boolean seen;

    public Notification() {
    }

    public Notification(Long senderID, Long receiverID, Long jobOfferID, Long jobDemandeID, NotificationTypeName content, boolean seen) {
        this.senderID = senderID;
        this.receiverID = receiverID;
        this.jobOfferID = jobOfferID;
        this.jobDemandeID = jobDemandeID;
        this.content = content;
        this.seen = seen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSenderID() {
        return senderID;
    }

    public void setSenderID(Long senderID) {
        this.senderID = senderID;
    }

    public Long getReceiverID() {
        return receiverID;
    }

    public void setReceiverID(Long receiverID) {
        this.receiverID = receiverID;
    }

    public Long getJobOfferID() {
        return jobOfferID;
    }

    public void setJobOfferID(Long jobOfferID) {
        this.jobOfferID = jobOfferID;
    }

    public Long getJobDemandeID() {
        return jobDemandeID;
    }

    public void setJobDemandeID(Long jobDemandeID) {
        this.jobDemandeID = jobDemandeID;
    }

    public NotificationTypeName getContent() {
        return content;
    }

    public void setContent(NotificationTypeName content) {
        this.content = content;
    }

    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }
}
