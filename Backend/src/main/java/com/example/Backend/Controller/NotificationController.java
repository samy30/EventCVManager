package com.example.Backend.Controller;

import com.example.Backend.Model.Notification;
import com.example.Backend.Repository.NotificationRepository;
import com.example.Backend.Service.PushNotificationsService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final String TOPIC = "JavaSampleApproach";

    @Autowired
    PushNotificationsService pushNotificationsService;

    @Autowired
    NotificationRepository notificationRepository;

    // Get Notification by receiver ID
    @GetMapping("/notification/{id}")
    public List<Notification> getNotificationByReceiverId(@PathVariable(value = "id") Long id) {
        return notificationRepository.findByReceiverID(id);
    }

    // Count all Notifications by receiver ID
    @GetMapping("/notification/{id}/all")
    public Long countNotificationByReceiverId(@PathVariable(value = "id") Long id) {
        Long seen = notificationRepository.countBySeenAndReceiverID(true,id);
        long unseen = notificationRepository.countBySeenAndReceiverID(false,id);
        return (seen+unseen);
    }

    // Count unseen Notifications by receiver ID
    @GetMapping("/notification/{id}/unseen")
    public Long countUnseenNotificationByReceiverId(@PathVariable(value = "id") Long id) {
        return notificationRepository.countBySeenAndReceiverID(false,id);
    }

    @RequestMapping(value = "/send", method = RequestMethod.GET, produces = "application/json")
    public void  sendNotificationTo(){
        //this.send("eEpJjRgdNqI:APA91bEjCZ9q1sMyVSIHhlvPy8POOx9c5ZztkDdo8FYynFZKqs8NjTSRUcaWogxAq_IWZ29NEXQC-b85HVV736YOQFdsRjIJWiMOj9acMPXrV0Mb2ZFG9lkLYqQgIG1UrZhuNFc469QM");
this.send("cvrVsZq-lQs:APA91bGyGOgtPJBti-LRoxpK96o8a4YQMaOqMnH_I_-YUvoQwHeVeQ2yZX_FaFGmArQKHpF-D474ScOWCbodJnsDS4tmBJxWT9RDbe59lZjVYpgBG0jVUFKB6EKp-9219J_9QmnbWS5C");
    }


    public ResponseEntity<String> send(String notificationID) throws JSONException {

        JSONObject body = new JSONObject();
        body.put("to",notificationID);
        body.put("priority", "high");

        JSONObject notification = new JSONObject();
        notification.put("title", "5edmeeet");
        notification.put("body", "Ya Mahmud 5edmeeet!");

        JSONObject data = new JSONObject();
        data.put("Key-1", "JSA Data 1");
        data.put("Key-2", "JSA Data 2");

        body.put("notification", notification);
        body.put("data", data);

/**
 {
 "notification": {
 "title": "JSA Notification",
 "body": "Happy Message!"
 },
 "data": {
 "Key-1": "JSA Data 1",
 "Key-2": "JSA Data 2"
 },
 "to": "/topics/JavaSampleApproach",
 "priority": "high"
 }
 */

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
