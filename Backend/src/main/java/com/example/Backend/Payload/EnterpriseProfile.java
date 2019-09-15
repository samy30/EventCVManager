package com.example.Backend.Payload;

import java.util.Date;

public class EnterpriseProfile {
    private Long id;
    private String name;
    private String description;
    private String activity;
    private String email;
    private Date joinedAt;
    private String notificationID;
    private String image;

    public EnterpriseProfile(Long id, String name, String description, String activity, String email, Date joinedAt, String image, String notificationID) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.activity = activity;
        this.email = email;
        this.joinedAt = joinedAt;
        this.image = image;
        this.notificationID = notificationID;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Date joinedAt) {
        this.joinedAt = joinedAt;
    }

    public String getNotificationID() {
        return notificationID;
    }

    public void setNotificationID(String notificationID) {
        this.notificationID = notificationID;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
