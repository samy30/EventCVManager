package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.*;
import com.example.Backend.Payload.EnterpriseProfile;
import com.example.Backend.Payload.EnterpriseSummary;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.JobOfferRepository;
import com.example.Backend.Repository.RoleRepository;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Security.CurrentUser;
import com.example.Backend.Security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class EnterpriseController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JobOfferRepository jobOfferRepository;

    @Autowired
    private JobDemandeRepository jobDemandeRepository;

    // get current enterprise
    @GetMapping("/enterprise/me")
    @PreAuthorize("hasRole('ENTERPRISE')")
    public EnterpriseSummary getCurrentEnterprise(@CurrentUser UserPrincipal currentUser) {
        return new EnterpriseSummary(currentUser.getId(),currentUser.getName(),currentUser.getDescription(),currentUser.getActivity(),currentUser.getEmail(),currentUser.getNotificationID());
    }

    // get all enterprises
    @GetMapping("/enterprise")
    public List<User> getAllEnterprises() {
        Optional<Role> role = roleRepository.findByName(RoleName.ROLE_ENTERPRISE);
        Set<Role> roles = new HashSet<>();
        roles.add(role.get());
        return userRepository.findByRoles(roles);
    }

    // get enterprise profile by username
    @GetMapping("/enterprise/{username}")
    public EnterpriseProfile getEnterpriseProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        EnterpriseProfile enterpriseProfile = new EnterpriseProfile(user.getId(),user.getUsername(),user.getDescription(),user.getActivity(),user.getEmail(),user.getCreatedAt(),user.getNotificationID());
        return enterpriseProfile;
    }

    // Update an enterprise
    @PutMapping("/enterprise/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','ENTERPRISE')")
    public User updateEnterprise(@PathVariable(value = "id") Long id,
                                 @Valid @RequestBody EnterpriseSummary enterpriseSummary) {

        User enterprise = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        enterprise.setName(enterpriseSummary.getName());
        enterprise.setDescription(enterpriseSummary.getDescription());
        enterprise.setActivity(enterpriseSummary.getActivity());
        enterprise.setEmail(enterpriseSummary.getEmail());

        User updatedEnterprise = userRepository.save(enterprise);
        return updatedEnterprise;
    }

    // Delete an Enterprise
    @DeleteMapping("/enterprise/{id}")
    public ResponseEntity<?> deleteEnterprise(@PathVariable(value = "id") Long id) {
        User enterprise = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));

        userRepository.delete(enterprise);

        return ResponseEntity.ok().build();
    }


    @GetMapping("/enterprise/me/jobOffers")
    @PreAuthorize("hasRole('ENTERPRISE')")
    public List<JobOffer> getJobOffersCreatedByCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", currentUser.getUsername()));


        List<JobOffer> jobOffers = jobOfferRepository.findByCreatedBy(user.getId());
        return jobOffers ;
    }

    @GetMapping("/enterprise/me/jobDemandes")
    @PreAuthorize("hasRole('ENTERPRISE')")
    public List<JobDemande> getJobDemandesForCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", currentUser.getUsername()));


        List<JobDemande> jobDemandes = jobDemandeRepository.findByEnterprise(user);
        return jobDemandes ;
    }

    @GetMapping("/enterprise/{username}/jobDemandes")
    public List<JobDemande> getJobDemandesForEnterprise(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", username));


        List<JobDemande> jobDemandes = jobDemandeRepository.findByEnterprise(user);
        return jobDemandes ;
    }
}
