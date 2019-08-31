package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.Job;
import com.example.Backend.Model.JobOffer;
import com.example.Backend.Repository.JobOfferRepository;
import com.example.Backend.Repository.JobRepository;
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
    JobRepository jobRepository;
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

//    // Update a JobOffer
//    @PutMapping("/jobOffer/{id}")
//    public JobOffer updateJobOffer(@PathVariable(value = "id") Long id,
//                                   @Valid @RequestBody JobOffer jobOfferDetails) {
//
//        JobOffer jobOffer = jobOfferRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "id", id));
//
//        jobOffer.setName(jobOfferDetails.getName());
//        jobOffer.setLevel(jobOfferDetails.getLevel());
//        jobOffer.setCv(jobOfferDetails.getCv());
//
//        JobOffer updatedJobOffer = jobOfferRepository.save(jobOffer);
//        return updatedJobOffer;
//    }

    // Delete a JobOffer
    @DeleteMapping("/jobOffer/{id}")
    public ResponseEntity<?> deleteJobOffer(@PathVariable(value = "id") Long id) {
        JobOffer jobOffer = jobOfferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobOffer", "id", id));

        jobOfferRepository.delete(jobOffer);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/jobOffer/jobs/{id}")
    public List<JobOffer> getJobOffersByName(@PathVariable(value = "id") Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        List<JobOffer> jobOffers = jobOfferRepository.findByName(job);
        return jobOffers ;
    }
}