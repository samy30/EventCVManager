package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.Job;
import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.JobOffer;
import com.example.Backend.Model.User;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.JobOfferRepository;
import com.example.Backend.Repository.JobRepository;
import com.example.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class JobOfferController {
    @Autowired
    JobOfferRepository jobOfferRepository;

    @Autowired
    JobDemandeRepository jobDemandeRepository;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;


    // Get All JobOffers
    @GetMapping("/jobOffer")
    public List<JobOffer> getAllJobOffers() {
        return jobOfferRepository.findAll();
    }

    // Create a new JobOffer
    @PostMapping("/jobOffer")
    public JobOffer createJobOffer(@Valid @RequestBody JobOffer jobOffer) {
        return jobOfferRepository.save(jobOffer);
    }

    // Get a Single JobOffer
    @GetMapping("/jobOffer/{id}")
    public JobOffer getJobOfferById(@PathVariable(value = "id") Long id) {
        return jobOfferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "id", id));
    }

    // Update a JobOffer
    @PutMapping("/jobOffer/{id}")
    public JobOffer updateJobOffer(@PathVariable(value = "id") Long id,
                                   @Valid @RequestBody JobOffer jobOfferDetails) {

        User enterprise = userRepository.findById(jobOfferDetails.getEnterprise().getId())
                .orElseThrow(() -> new ResourceNotFoundException("enterprise", "id", id));

        Job job = jobRepository.findById(jobOfferDetails.getJob().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));

        JobOffer jobOffer = jobOfferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "id", id));


        jobOffer.setEnterprise(enterprise);
        jobOffer.setJob(job);
        jobOffer.setTown(jobOfferDetails.getTown());
        jobOffer.setSkills(jobOfferDetails.getSkills());
        jobOffer.setActivity(jobOfferDetails.getActivity());
        jobOffer.setDescription(jobOfferDetails.getDescription());
        jobOffer.setStartingDate(jobOfferDetails.getStartingDate());
        jobOffer.setType(jobOfferDetails.getType());
        jobOffer.setExperienceYears(jobOfferDetails.getExperienceYears());
        jobOffer.setMinimumSchoolDegree(jobOfferDetails.getMinimumSchoolDegree());
        jobOffer.setTime(jobOfferDetails.getTime());
        if(jobOfferDetails.getWage() == null)jobOffer.setWage(jobOfferDetails.getWage());

        JobOffer updatedJobOffer = jobOfferRepository.save(jobOffer);
        return updatedJobOffer;
    }

    // Delete a JobOffer
    @DeleteMapping("/jobOffer/{id}")
    public ResponseEntity<?> deleteJobOffer(@PathVariable(value = "id") Long id) {
        JobOffer jobOffer = jobOfferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "id", id));

        List<JobDemande> jobdemandesToDelete = jobDemandeRepository.findByJobOffer(jobOffer);
        for (JobDemande jobDemandeToDelete:jobdemandesToDelete
        ) {
            jobDemandeRepository.delete(jobDemandeToDelete);
        }

        jobOfferRepository.delete(jobOffer);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/jobOffer/jobs/{id}")
    public List<JobOffer> getJobOffersByName(@PathVariable(value = "id") Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        List<JobOffer> jobOffers = jobOfferRepository.findByJob(job);
        return jobOffers ;
    }

    @GetMapping("/jobOffer/jobs/count/{id}")
    public Long countJobOffersByJob(@PathVariable(value = "id") Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        Long jobOffersNumber = jobOfferRepository.countByJob(job);
        return jobOffersNumber ;
    }




}
