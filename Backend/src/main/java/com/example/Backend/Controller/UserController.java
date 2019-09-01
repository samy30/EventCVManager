package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.CV;
import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.JobOffer;
import com.example.Backend.Model.User;
import com.example.Backend.Payload.*;
import com.example.Backend.Repository.CVRepository;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.JobOfferRepository;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Security.CurrentUser;
import com.example.Backend.Security.UserPrincipal;
import com.example.Backend.Util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CVRepository cvRepository;

    @Autowired
    private JobOfferRepository jobOfferRepository;

    @Autowired
    private JobDemandeRepository jobDemandeRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    public UserPrincipal getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return currentUser;
    }

    @GetMapping("/enterprise/me")
    @PreAuthorize("hasRole('ENTERPRISE')")
    public EnterpriseSummary getCurrentEnterprise(@CurrentUser UserPrincipal currentUser) {
        EnterpriseSummary enterpriseSummary = new EnterpriseSummary(currentUser.getId(),currentUser.getName(),currentUser.getDescription(),currentUser.getActivity(),currentUser.getEmail());
        return enterpriseSummary;
    }

    // Get a Single User
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable(value = "id") Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        long cvCount = cvRepository.countByCreatedBy(user.getId());

        UserProfile userProfile = new UserProfile(user.getId(),user.getUsername(),user.getFirstName(),user.getLastName(),user.getEmail(),user.getAge(),user.getGender(),user.getCreatedAt());

        return userProfile;
    }

    @GetMapping("/enterprises/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public EnterpriseProfile getEnterpriseProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        EnterpriseProfile enterpriseProfile = new EnterpriseProfile(user.getId(),user.getUsername(),user.getDescription(),user.getActivity(),user.getEmail(),user.getCreatedAt());
        return enterpriseProfile;
    }

    @GetMapping("/users/{username}/cvs")
    public List<CV> getCVsCreatedBy(@PathVariable(value = "username") String username,
                                    @CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("CV", "username", username));

        // Retrieve all polls created by the given username
        List<CV> cvs = cvRepository.findByCreatedBy(user.getId());
        return cvs ;
    }

    @GetMapping("/enterprises/{username}/jobOffers")
    public List<JobOffer> getJobOffersCreatedBy(@PathVariable(value = "username") String username,
                                          @CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", username));


        List<JobOffer> jobOffers = jobOfferRepository.findByCreatedBy(user.getId());
        return jobOffers ;
    }

    @GetMapping("/enterprises/me/jobOffers")
    @PreAuthorize("hasRole('ENTERPRISE')")
    public List<JobOffer> getJobOffersCreatedByCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", currentUser.getUsername()));


        List<JobOffer> jobOffers = jobOfferRepository.findByCreatedBy(user.getId());
        return jobOffers ;
    }

    @GetMapping("/enterprises/{username}/jobDemandes")
    public List<JobDemande> getJobDemandesForEnterprise(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", username));


        List<JobDemande> jobDemandes = jobDemandeRepository.findByEnterprise(user);
        return jobDemandes ;
    }

    @GetMapping("/users/{username}/jobDemandes")
    public List<JobDemande> getJobDemandesForUser(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", username));


        List<JobDemande> jobDemandes = jobDemandeRepository.findBySender(user);
        return jobDemandes ;
    }


//    @GetMapping("/users/{username}/votes")
//    public PagedResponse<PollResponse> getPollsVotedBy(@PathVariable(value = "username") String username,
//                                                       @CurrentUser UserPrincipal currentUser,
//                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
//                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
//        return pollService.getPollsVotedBy(username, currentUser, page, size);
//    }

}
