package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.*;
import com.example.Backend.Payload.*;
import com.example.Backend.Repository.*;
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

import javax.validation.Valid;
import java.util.*;

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

    @Autowired
    private RoleRepository roleRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    public UserPrincipal getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return currentUser;
    }


    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/users")
    public List<User> getAllNormalUsers() {
        Optional<Role> role = roleRepository.findByName(RoleName.ROLE_USER);
        Set<Role> roles = new HashSet<>();
        roles.add(role.get());
        return userRepository.findByRoles(roles);
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

        UserProfile userProfile = new UserProfile(user.getId(),user.getUsername(),user.getFirstName(),user.getLastName(),user.getEmail(),user.getAge(),user.getGender(),user.getCreatedAt(),user.getNotificationID());

        return userProfile;
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

    @GetMapping("/enterprise/{username}/jobOffers")
    public List<JobOffer> getJobOffersCreatedBy(@PathVariable(value = "username") String username,
                                          @CurrentUser UserPrincipal currentUser) {

        User enterprise = userRepository.findByUsername(username).get();
        List<JobOffer> jobOffers = jobOfferRepository.findAllByEnterprise(enterprise);
        return jobOffers ;
    }

    @GetMapping("/users/{username}/jobDemandes")
    public List<JobDemande> getJobDemandesForUser(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", username));


        List<JobDemande> jobDemandes = jobDemandeRepository.findBySender(user);
        return jobDemandes ;
    }

    @GetMapping("/users/gender/count/{gender}")
    public Long countUsersByGender(@PathVariable(value = "gender") String gender) {

        Long usersNumber = userRepository.countByGender(gender);
        return usersNumber ;
    }

    // Update a User Notification Token
    @PutMapping("/users/{id}/notificationToken")
    public User updateUserNotificationToken(@PathVariable(value = "id") Long id,
                         @Valid @RequestBody NotificationToken notificationToken) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        user.setNotificationID(notificationToken.getToken());

        User updatedUser = userRepository.save(user);
        return updatedUser;
    }


//    @GetMapping("/users/me/jobDemandes/notifications")
//    public List<JobDemande> getJobDemandesForUserForNotification(@CurrentUser UserPrincipal currentUser) {
//        User user = userRepository.findByUsername(currentUser.getUsername())
//                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", currentUser.getUsername()));
//
//
//        List<JobDemande> jobDemandes1 = jobDemandeRepository.findBySenderAndStatusAndSeenByUser(user,"accepted",false);
//        List<JobDemande> jobDemandes2 = jobDemandeRepository.findBySenderAndStatusAndSeenByUser(user,"refused",false);
//        jobDemandes1.addAll(jobDemandes2);
//        return jobDemandes1 ;
//    }

//    @GetMapping("/enterprises/me/jobDemandes/notifications")
//    public List<JobDemande> getJobDemandesForEnterpriseForNotification(@CurrentUser UserPrincipal currentUser) {
//        User user = userRepository.findByUsername(currentUser.getUsername())
//                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", currentUser.getUsername()));
//
//
//        List<JobDemande> jobDemandes = jobDemandeRepository.findBySeenByEnterpriseAndEnterprise(false, user);
//        return jobDemandes ;
//    }




//    @GetMapping("/users/{username}/votes")
//    public PagedResponse<PollResponse> getPollsVotedBy(@PathVariable(value = "username") String username,
//                                                       @CurrentUser UserPrincipal currentUser,
//                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
//                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
//        return pollService.getPollsVotedBy(username, currentUser, page, size);
//    }

}
