package com.example.Backend.Payload;

import java.time.Instant;
import java.util.List;

public class CVResponse {
    private Long id;
    private String question;
    private List<InterestResponse> interests;
    private List<LanguageResponse> languages;
    private List<ProfessionalExperienceResponse> professionalExperiences;
    private List<SocialMediaResponse> socialMedias;
    private List<SoftwareResponse> softwares;
    private List<StudyResponse> studies;
    private UserSummary createdBy;
    private Instant creationDateTime;
    private Instant expirationDateTime;
    private Boolean isExpired;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<InterestResponse> getInterests() {
        return interests;
    }

    public void setInterests(List<InterestResponse> interests) {
        this.interests = interests;
    }

    public List<LanguageResponse> getLanguages() {
        return languages;
    }

    public void setLanguages(List<LanguageResponse> languages) {
        this.languages = languages;
    }

    public List<ProfessionalExperienceResponse> getProfessionalExperiences() {
        return professionalExperiences;
    }

    public void setProfessionalExperiences(List<ProfessionalExperienceResponse> professionalExperiences) {
        this.professionalExperiences = professionalExperiences;
    }

    public List<SocialMediaResponse> getSocialMedias() {
        return socialMedias;
    }

    public void setSocialMedias(List<SocialMediaResponse> socialMedias) {
        this.socialMedias = socialMedias;
    }

    public List<SoftwareResponse> getSoftwares() {
        return softwares;
    }

    public void setSoftwares(List<SoftwareResponse> softwares) {
        this.softwares = softwares;
    }

    public List<StudyResponse> getStudies() {
        return studies;
    }

    public void setStudies(List<StudyResponse> studies) {
        this.studies = studies;
    }

    public UserSummary getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserSummary createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public Instant getExpirationDateTime() {
        return expirationDateTime;
    }

    public void setExpirationDateTime(Instant expirationDateTime) {
        this.expirationDateTime = expirationDateTime;
    }

    public Boolean getExpired() {
        return isExpired;
    }

    public void setExpired(Boolean expired) {
        isExpired = expired;
    }
}
