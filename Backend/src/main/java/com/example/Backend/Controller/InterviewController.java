package com.example.Backend.Controller;

import com.example.Backend.Payload.InterviewCalendarPayload;
import com.example.Backend.Payload.InterviewSessionPayload;
import com.example.Backend.Security.CurrentUser;
import com.example.Backend.Security.UserPrincipal;
import com.example.Backend.Service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InterviewController {

    @Autowired
    InterviewService interviewService;

    @PostMapping("/api/interviews")
    public void createInterviewCalendar(
            @RequestBody InterviewCalendarPayload interviewCalendarPayload
    ) {
        System.out.println("Coucou");
        interviewService.createInterviewCalendar(interviewCalendarPayload);
        System.out.println("Yoo");
    }

    @GetMapping("/api/interviews")
    public List<InterviewSessionPayload> getInterviewCalendar() {
        return interviewService.getInterviewSessions();
    }
}

