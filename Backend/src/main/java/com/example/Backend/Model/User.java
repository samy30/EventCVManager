package com.example.Backend.Model;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

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

    @NotBlank
    @Size(max = 100)
    private String town;



    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

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

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNotificationID() {
        return notificationID;
    }

    public void setNotificationID(String notificationID) {
        this.notificationID = notificationID;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }
}
