package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.Job;
import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.JobOffer;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.JobOfferRepository;
import com.example.Backend.Repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class JobController {
    @Autowired
    JobRepository jobRepository;

    @Autowired
    JobOfferRepository jobOfferRepository;

    @Autowired
    JobDemandeRepository jobDemandeRepository;

    // Get All Jobs
    @GetMapping("/job")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Create a new Job
    @PostMapping("/job")
    public Job createJob(@Valid @RequestBody Job job) {
        return jobRepository.save(job);
    }

    // Get a Single Job
    @GetMapping("/job/{id}")
    public Job getJobById(@PathVariable(value = "id") Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
    }

    // Update a Job
    @PutMapping("/job/{id}")
    public Job updateJob(@PathVariable(value = "id") Long id,
                                   @Valid @RequestBody Job jobDetails) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));

        job.setName(jobDetails.getName());

        Job updatedJob = jobRepository.save(job);
        return updatedJob;
    }

    // Delete a Job
    @DeleteMapping("/job/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable(value = "id") Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        List<JobOffer> jobOffersToDelete = jobOfferRepository.findByJob(job);
        for (JobOffer jobOfferToDelete:jobOffersToDelete
             ) {
            List<JobDemande> jobdemandesToDelete = jobDemandeRepository.findByJobOffer(jobOfferToDelete);
            for (JobDemande jobDemandeToDelete:jobdemandesToDelete
            ) {
                jobDemandeRepository.delete(jobDemandeToDelete);
            }
            jobOfferRepository.delete(jobOfferToDelete);
        }

        jobRepository.delete(job);

        return ResponseEntity.ok().build();
    }
}