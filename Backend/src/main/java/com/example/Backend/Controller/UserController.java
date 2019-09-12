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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
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
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        long cvCount = cvRepository.countByCreatedBy(user.getId());

        UserProfile userProfile = new UserProfile(user.getId(),user.getUsername(),user.getFirstName(),user.getLastName(),user.getEmail(),user.getAge(),user.getGender(),user.getCreatedAt(),user.getImage(),user.getNotificationID(), user.getTown());

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
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "username", username));


        List<JobOffer> jobOffers = jobOfferRepository.findByCreatedBy(user.getId());
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

    // Update a user
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable(value = "id") Long id,
                                              @Valid @RequestBody UserSummary userSummary) {


        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        if((userRepository.existsByEmail(userSummary.getEmail())) && (!userSummary.getEmail().equals(user.getEmail()))) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        if((userRepository.existsByUsername(userSummary.getUsername())) && (!userSummary.getUsername().equals(user.getUsername()))) {
            return new ResponseEntity(new ApiResponse(false, "Username already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        user.setFirstName(userSummary.getFirstName());
        user.setLastName(userSummary.getLastName());
        user.setGender(userSummary.getGender());
        user.setAge(userSummary.getAge());
        user.setImage(userSummary.getImage());
        if(!userSummary.getUsername().equals(user.getUsername()))
        user.setUsername(userSummary.getUsername());
        if(!userSummary.getEmail().equals(user.getEmail()))
        user.setEmail(userSummary.getEmail());
        user.setTown(userSummary.getTown());
        User updatedUser = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(updatedUser.getUsername()).toUri();

        return ResponseEntity.created(location).body(updatedUser);
    }
}
