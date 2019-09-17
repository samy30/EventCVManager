package com.example.Backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cvs")
public class CV extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String firstName;

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    @NotBlank
    private String nationality;

    @NotNull
    private Boolean drivingLicence;

    @NotBlank
    private String lastName;

    @NotBlank
    private String address;

    @NotBlank
    private String phone;

    @NotBlank
    private String email;

    @Column(columnDefinition="LONGTEXT")
    private String photo;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "cv")
    private Set<ProfessionalExperience> professionalExperiences  = new HashSet<>();

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "cv")
    private Set<Interest> interests  = new HashSet<>();

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "cv")
    private Set<Language> languages  = new HashSet<>();

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "cv")
    private Set<SocialMedia> socialMedias  = new HashSet<>();

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "cv")
    private Set<Software> softwares  = new HashSet<>();

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "cv")
    private Set<Study> studies  = new HashSet<>();

    @JsonBackReference
    @OneToOne(mappedBy = "cv")
    private JobDemande jobRequest;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Set<ProfessionalExperience> getProfessionalExperiences() {
        return professionalExperiences;
    }

    public void setProfessionalExperiences(Set<ProfessionalExperience> professionalExperiences) {
        this.professionalExperiences = professionalExperiences;
    }

    public Set<Interest> getInterests() {
        return interests;
    }

    public void setInterests(Set<Interest> interests) {
        this.interests = interests;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public Set<SocialMedia> getSocialMedias() {
        return socialMedias;
    }

    public void setSocialMedias(Set<SocialMedia> socialMedias) {
        this.socialMedias = socialMedias;
    }

    public Set<Software> getSoftwares() {
        return softwares;
    }

    public void setSoftwares(Set<Software> softwares) {
        this.softwares = softwares;
    }

    public Set<Study> getStudies() {
        return studies;
    }

    public void setStudies(Set<Study> studies) {
        this.studies = studies;
    }

    public Boolean getDrivingLicence() {
        return drivingLicence;
    }

    public void setDrivingLicence(Boolean drivingLicence) {
        this.drivingLicence = drivingLicence;
    }

    public JobDemande getJobRequest() {
        return jobRequest;
    }

    public void setJobRequest(JobDemande jobRequest) {
        this.jobRequest = jobRequest;
    }
}
