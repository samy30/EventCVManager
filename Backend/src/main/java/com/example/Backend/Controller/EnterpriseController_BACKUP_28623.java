package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.*;
import com.example.Backend.Payload.*;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.JobOfferRepository;
import com.example.Backend.Repository.RoleRepository;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Security.CurrentUser;
import com.example.Backend.Security.UserPrincipal;
import com.example.Backend.Service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
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

    @Autowired
    private InterviewService interviewService;

    // get current enterprise
    @GetMapping("/enterprise/me")
    @PreAuthorize("hasRole('ENTERPRISE')")
    public EnterpriseSummary getCurrentEnterprise(@CurrentUser UserPrincipal currentUser) {
        return new EnterpriseSummary(currentUser.getId(),currentUser.getName(),currentUser.getDescription(),currentUser.getActivity(),currentUser.getEmail(),currentUser.getImage(), currentUser.getNotificationID());
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

        EnterpriseProfile enterpriseProfile = new EnterpriseProfile(user.getId(),user.getUsername(),user.getDescription(),user.getActivity(),user.getEmail(),user.getCreatedAt(), user.getImage(), user.getNotificationID());
        return enterpriseProfile;
    }

    // Update an enterprise
    @PutMapping("/enterprise/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','ENTERPRISE')")
    public ResponseEntity<?> updateEnterprise(@PathVariable(value = "id") Long id,
                                 @Valid @RequestBody EnterpriseSummary enterpriseSummary) {

        if(userRepository.existsByEmail(enterpriseSummary.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        User enterprise = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        enterprise.setName(enterpriseSummary.getName());
        enterprise.setDescription(enterpriseSummary.getDescription());
        enterprise.setActivity(enterpriseSummary.getActivity());
        enterprise.setEmail(enterpriseSummary.getEmail());

        User updatedEnterprise = userRepository.save(enterprise);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(updatedEnterprise.getUsername()).toUri();

        return ResponseEntity.created(location).body(updatedEnterprise);
    }

    // Delete an Enterprise
    @DeleteMapping("/enterprise/{id}")
    public ResponseEntity<?> deleteEnterprise(@PathVariable(value = "id") Long id) {
        User enterprise = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));

        userRepository.delete(enterprise);

        return ResponseEntity.ok().build();
    }

    // get job offers created by enterprise
    @GetMapping("/enterprise/me/jobOffers")
    @PreAuthorize("hasRole('ENTERPRISE')")
    public List<JobOffer> getJobOffersCreatedByCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", currentUser.getUsername()));


        List<JobOffer> jobOffers = jobOfferRepository.findByCreatedBy(user.getId());
        return jobOffers ;
    }

//    @GetMapping("/enterprise/{username}/jobOffers")
//    public List<JobOffer> getJobOffersCreatedByEnterpriseUsername(@PathVariable String username) {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", username));
//
//
//        List<JobOffer> jobOffers = jobOfferRepository.findByCreatedBy(user.getId());
//        return jobOffers ;
//    }

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

<<<<<<< HEAD
    @PostMapping("/enterprise/{username}/interviewCalendar")
    public InterviewCalendar createInterviewCalendar(
            @PathVariable String username,
            @RequestBody InterviewCalendarPayload interviewCalendarPayload
            ) {
        return interviewService.createInterviewCalendar(username, interviewCalendarPayload);
    }

=======
    @GetMapping("/enterprise/{id}/jobDemandes/confirmed")
    public List<JobDemande> getConfirmedJobDemandesForEnterprise(@PathVariable(value = "id") Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "id", id));
        
        List<JobDemande> jobDemandes = jobDemandeRepository.findByEnterpriseAndConfirmedByUser(user,true);
        return jobDemandes ;
    }
>>>>>>> 47941690ab268858b972da17b8407b9759a7e22b
}
