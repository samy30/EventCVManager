package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.Job;
import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.Notification;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class JobDemandeController {
    @Autowired
    JobDemandeRepository jobDemandeRepository;

    @Autowired
    NotificationRepository notificationRepository;

    // Get All JobDemandes
    @GetMapping("/jobDemande")
    public List<JobDemande> getAllJobDemandes() {
        return jobDemandeRepository.findAll();
    }

    // Create a new JobDemande
    @PostMapping("/jobDemande")
    public JobDemande createJobDemande(@Valid @RequestBody JobDemande jobDemande) {
        JobDemande createdJobDemande = jobDemandeRepository.save(jobDemande);
        notifyEnterprise(createdJobDemande.getSender().getId(),createdJobDemande.getEnterprise().getId(),createdJobDemande.getJobOffer().getId(),createdJobDemande.getId(),"Job Demande sent",true);
        return createdJobDemande;
    }

    // Get a Single JobDemande
    @GetMapping("/jobDemande/{id}")
    public JobDemande getJobDemandeById(@PathVariable(value = "id") Long id) {
        return jobDemandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobDemande", "id", id));
    }

    // Update a JobDemande
    @PutMapping("/jobDemande/{id}")
    public JobDemande updateJobDemande(@PathVariable(value = "id") Long id,
                                   @Valid @RequestBody JobDemande jobDemandeDetails) {

        JobDemande jobDemande = jobDemandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobDemande", "id", id));

        if(jobDemandeDetails.getCv() != null) jobDemande.setCv(jobDemandeDetails.getCv());
        if(jobDemandeDetails.getStatus() != null) jobDemande.setStatus(jobDemandeDetails.getStatus());

        JobDemande updatedJobDemande = jobDemandeRepository.save(jobDemande);
        return updatedJobDemande;
    }

    // Delete a JobDemande
    @DeleteMapping("/jobDemande/{id}")
    public ResponseEntity<?> deleteJobDemande(@PathVariable(value = "id") Long id) {
        JobDemande jobDemande = jobDemandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobDemande", "id", id));

        jobDemandeRepository.delete(jobDemande);

        return ResponseEntity.ok().build();
    }

    // notify enterprise
    public void notifyEnterprise(Long sender,Long receiver, Long jobOffer, Long jobDemande, String content, boolean seen){
        Notification notification = new Notification(sender,receiver,jobOffer,jobDemande,content,seen);
        Notification cratedNotification = notificationRepository.save(notification);
    }
}