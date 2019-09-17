package com.example.Backend.Model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
public class User extends AuditModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 360)
    private String name;

    @Size(max = 360)
    private String firstName;

    @Size(max = 360)
    private String lastName;


    private Long age;

    @Lob
    private String image;

    @Size(max = 160)
    private String gender;

    @Size(max = 5000)
    private String description;

    @Size(max = 160)
    private String activity;

    private String notificationID;

    @NotBlank
    @Size(max = 1000)
    private String username;

    @NotBlank
    @Size(max = 160)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    @Size(max = 100)
    private String town;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "enterprise")
    private Set<InterviewSession> EnterpriseInterviewSessions = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "jobSeeker")
    private Set<InterviewSession> jobSeekerInterviewSessions = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "enterprise")
    private Set<JobOffer> jobOffers = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "sender")
    private JobDemande jobRequest;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "enterprise")
    private Set<JobDemande> jobRequests = new HashSet<>();

    public User() {

    }

    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(@Size(max = 40) String name, @Size(max = 40) String firstName, @Size(max = 40) String lastName, Long age, @Size(max = 40) String gender, String image, @Size(max = 40) String description, @Size(max = 40) String activity, @NotBlank @Size(max = 15) String username, @NotBlank @Size(max = 40) @Email String email, @NotBlank @Size(max = 100) String password, Set<Role> roles, String notificationID, String town) {
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.image = image;
        this.description = description;
        this.activity = activity;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.notificationID = notificationID;
        this.town = town;
    }

    public User(@Size(max = 40) String firstName, @Size(max = 40) String lastName, Long age, @Size(max = 40) String gender, String image, @NotBlank @Size(max = 15) String username, @NotBlank @Size(max = 40) @Email String email, @NotBlank @Size(max = 100) String password, String notificationID, String town) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.image = image;
        this.username = username;
        this.email = email;
        this.password = password;
        this.notificationID = notificationID;
        this.town = town;
    }

    public User(@Size(max = 40) String name, String image, @Size(max = 40) String description, @Size(max = 40) String activity, String notificationID, @NotBlank @Size(max = 15) String username, @NotBlank @Size(max = 40) @Email String email, @NotBlank @Size(max = 100) String password, Set<Role> roles) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.activity = activity;
        this.notificationID = notificationID;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public User(String firstName, String lastName, long age, String gender, String username, String email, String password, String notificationID, String town) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.username = username;
        this.email = email;
        this.password = password;
        this.town = town;
        this.notificationID = notificationID;
    }

    public User(String name, String description, String activity, String username, String email, String password, String notificationID) {
        this.name = name;
        this.description = description;
        this.activity = activity;
        this.username = username;
        this.email = email;
        this.password = password;
        this.notificationID = notificationID;
    }
}
