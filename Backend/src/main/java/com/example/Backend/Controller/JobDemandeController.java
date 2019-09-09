package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.*;
import com.example.Backend.Payload.JobDemandeResponse;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.NotificationRepository;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Service.PushNotificationsService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class JobDemandeController {
    @Autowired
    JobDemandeRepository jobDemandeRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    PushNotificationsService pushNotificationsService;

    @Autowired
    UserRepository userRepository;

    // Get All JobDemandes
    @GetMapping("/jobDemande")
    public List<JobDemande> getAllJobDemandes() {
        return jobDemandeRepository.findAll();
    }

    // Create a new JobDemande
    @PostMapping("/jobDemande")
    public JobDemande createJobDemande(@Valid @RequestBody JobDemande jobDemande) {
        JobDemande createdJobDemande = jobDemandeRepository.save(jobDemande);
        notifyEnterprise(createdJobDemande.getSender().getId(),createdJobDemande.getEnterprise().getId(),createdJobDemande.getJobOffer().getId(),createdJobDemande.getId(), NotificationTypeName.JOB_DEMANDE_SENT,true);
        return createdJobDemande;
    }

    // Response to a JobDemande
    @PutMapping("/jobDemande/{id}/response")
    public JobDemande jobDemandeEnterpriseResponse(@PathVariable(value = "id") Long id,
                                       @Valid @RequestBody JobDemandeResponse jobDemandeDetails) {

        JobDemande jobDemande = jobDemandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobDemande", "id", id));

        jobDemande.setStatus(jobDemandeDetails.getStatus());

        JobDemande updatedJobDemande = jobDemandeRepository.save(jobDemande);
        if(jobDemandeDetails.getStatus() == Status.ACCEPTED)
        notifyEnterprise(jobDemande.getEnterprise().getId(),jobDemande.getSender().getId(),jobDemande.getJobOffer().getId(),jobDemande.getId(),NotificationTypeName.JOB_DEMANDE_ACCEPTED,false);
        else if(jobDemandeDetails.getStatus() == Status.REFUSED)
            notifyEnterprise(jobDemande.getEnterprise().getId(),jobDemande.getSender().getId(),jobDemande.getJobOffer().getId(),jobDemande.getId(),NotificationTypeName.JOB_DEMANDE_REFUSED,false);
        return updatedJobDemande;
    }

  
 // Confirm a JobDemande
    @GetMapping("/jobDemande/{id}/confirm")
    public JobDemande confirmJobDemande(@PathVariable(value = "id") Long id) {

        JobDemande jobDemande = jobDemandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobDemande", "id", id));

        jobDemande.setConfirmedByUser(true);
        jobDemande.setStatus(Status.CONFIRMED);

        JobDemande updatedJobDemande = jobDemandeRepository.save(jobDemande);
        notifyEnterprise(jobDemande.getSender().getId(),jobDemande.getEnterprise().getId(),jobDemande.getJobOffer().getId(),jobDemande.getId(), NotificationTypeName.CONFIRMATION,true);
        return updatedJobDemande;
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
    public void notifyEnterprise(Long sender,Long receiver, Long jobOffer, Long jobDemande, NotificationTypeName content, boolean seen){
        Notification notification = new Notification(sender,receiver,jobOffer,jobDemande,content,seen);
        Notification createdNotification = notificationRepository.save(notification);
        User senderUser = userRepository.findById(sender)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", sender));
        User receiverUser = userRepository.findById(receiver)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", sender));
        if(content == NotificationTypeName.JOB_DEMANDE_ACCEPTED)
        send(receiverUser.getNotificationID(),senderUser.getName(), content);
        else if(content == NotificationTypeName.JOB_DEMANDE_REFUSED)
            send(receiverUser.getNotificationID(),senderUser.getName(), content);
        else if(content == NotificationTypeName.JOB_DEMANDE_SENT)
        send(receiverUser.getNotificationID(),senderUser.getFirstName()+' '+senderUser.getLastName(), content);
        else if(content == NotificationTypeName.CONFIRMATION)
            send(receiverUser.getNotificationID(),senderUser.getFirstName()+' '+senderUser.getLastName(), content);
    }

    public ResponseEntity<String> send(String notificationID, String senderName, NotificationTypeName type) throws JSONException {

        JSONObject body = new JSONObject();
        body.put("to",notificationID);
        body.put("priority", "high");

        JSONObject notification = new JSONObject();
        if(type == NotificationTypeName.JOB_DEMANDE_SENT){
            notification.put("title", "Nouvelle demande d'emploie reçue !");
            notification.put("body", "l'utilisateur "+senderName+" vous a envoyé une demande d'emploie");
        }
        if(type == NotificationTypeName.JOB_DEMANDE_ACCEPTED){
            notification.put("title", "Demande d'emploie acceptée !");
            notification.put("body", "l'entreprise "+senderName+" a accepté votre demande d'emploie et vous invite pour un entretient");
        }
        if(type == NotificationTypeName.JOB_DEMANDE_REFUSED){
            notification.put("title", "Demande d'emploie refusée !");
            notification.put("body", "l'entreprise "+senderName+" a refusé votre demande d'emploie");
        }
        if(type == NotificationTypeName.CONFIRMATION){
            notification.put("title", "Entretient Confirmé !");
            notification.put("body", "l'utilisateur "+senderName+" a confirmé sa présence pour l'entretient");
        }

        JSONObject data = new JSONObject();
        data.put("Key-1", "JSA Data 1");
        data.put("Key-2", "JSA Data 2");

        body.put("notification", notification);
        body.put("data", data);



        HttpEntity<String> request = new HttpEntity<>(body.toString());

        CompletableFuture<String> pushNotification = pushNotificationsService.send(request);
        CompletableFuture.allOf(pushNotification).join();

        try {
            String firebaseResponse = pushNotification.get();

            return new ResponseEntity<>(firebaseResponse, HttpStatus.OK);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("Push Notification ERROR!", HttpStatus.BAD_REQUEST);
    }
}