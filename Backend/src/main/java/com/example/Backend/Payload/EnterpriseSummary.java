package com.example.Backend.Payload;

public class EnterpriseSummary {
    private Long id;
    private String name;
    private String description;
    private String activity;
    private String email;

    public EnterpriseSummary(Long id, String name, String description, String activity, String email) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.activity = activity;
        this.email = email;
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
}
