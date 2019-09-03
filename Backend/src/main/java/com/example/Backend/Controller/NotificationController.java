package com.example.Backend.Controller;

import com.example.Backend.Service.PushNotificationsService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
public class NotificationController {

    private final String TOPIC = "JavaSampleApproach";

    @Autowired
    PushNotificationsService pushNotificationsService;

    @RequestMapping(value = "/send", method = RequestMethod.GET, produces = "application/json")
    public void  sendNotificationTo(){
        this.send("eEpJjRgdNqI:APA91bEjCZ9q1sMyVSIHhlvPy8POOx9c5ZztkDdo8FYynFZKqs8NjTSRUcaWogxAq_IWZ29NEXQC-b85HVV736YOQFdsRjIJWiMOj9acMPXrV0Mb2ZFG9lkLYqQgIG1UrZhuNFc469QM");
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
