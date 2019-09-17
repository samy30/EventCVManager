package com.example.Backend.Controller;

import com.example.Backend.Payload.InterviewSessionPayload;
import com.example.Backend.Security.CurrentUser;
import com.example.Backend.Security.UserPrincipal;
import com.example.Backend.Service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InterviewController {

    @Autowired
    InterviewService interviewService;

    @PostMapping("/api/interviews")
    public void createInterviewCalendar() {
        interviewService.createInterviewCalendar();
    }

    @GetMapping("/api/interviews")
    public List<InterviewSessionPayload> getInterviewCalendar() {
        return interviewService.getInterviewSessions();
    }

    @GetMapping("/api/interviews/candidate/{username}")
    public List<InterviewSessionPayload> getUserInterviewSessions(@PathVariable String username) {
        return interviewService.getCandidateInterviewSessions(username);
    }

    @GetMapping("/api/interviews/enterprise/{username}")
    public List<InterviewSessionPayload> getEnterpriseInterviewSessions(@PathVariable String username) {
        return interviewService.getEnterpriseInterviewSessions(username);
    }
}

