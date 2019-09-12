package com.example.Backend.Service;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.InterviewSession;
import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.User;
import com.example.Backend.Payload.InterviewCalendarPayload;
import com.example.Backend.Payload.InterviewSessionPayload;
import com.example.Backend.Repository.InterviewSessionRepository;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewService {

    @Autowired
    private InterviewSessionRepository interviewSessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobDemandeRepository jobRequestRepository;

    public void createInterviewCalendar(InterviewCalendarPayload interviewCalendarPayload) {
        List<InterviewSession> interviewSessions = mapInterviewSessionPayloadsToInterviewSessions(
                interviewCalendarPayload.getInterviewSessionPayloads()
        );
        interviewSessions
                .stream()
                .forEach(interviewSession -> {
                    User enterprise = userRepository.findByUsername(interviewSession.getEnterprise().getUsername()).get();
                    enterprise.getInterviewSessions().add(interviewSession);
                    userRepository.save(enterprise);
                    interviewSessionRepository.save(interviewSession);
                });
        System.out.println("Interview Sessions Saved Successfully");
    }

    public InterviewSession mapInterviewSessionPayloadToInterviewSession(InterviewSessionPayload interviewSessionPayload) {
        JobDemande jobRequest = jobRequestRepository.findById(interviewSessionPayload.getJobRequestId())
                .orElseThrow(() -> new ResourceNotFoundException("JOB_DEMANDE", "id", interviewSessionPayload.getJobRequestId()));
        User jobSeeker = userRepository.findByJobRequestId(interviewSessionPayload.getJobRequestId());
        User entreprise = userRepository.findByJobRequestId(interviewSessionPayload.getJobRequestId());
        return InterviewSession
                .builder()
                .fromTimeInterval(interviewSessionPayload.getFromTimeInterval())
                .toTimeInterval(interviewSessionPayload.getToTimeInterval())
                .jobSeeker(jobSeeker)
                .jobRequest(jobRequest)
                .jobName(interviewSessionPayload.getJobName())
                .enterprise(entreprise)
                .build();
    }

    public List<InterviewSession> mapInterviewSessionPayloadsToInterviewSessions(
            List<InterviewSessionPayload> interviewSessionPayloads
    ) {
        return interviewSessionPayloads
                .stream()
                .map(interviewSessionPayload -> mapInterviewSessionPayloadToInterviewSession(interviewSessionPayload))
                .collect(Collectors.toList());
    }

    public List<InterviewSessionPayload> getInterviewSessions() {
        return interviewSessionRepository
                .findAll()
                .stream()
                .map(interviewSession -> InterviewSessionPayload
                        .builder()
                        .enterpriseUsername(interviewSession.getEnterprise().getUsername())
                        .jobName(interviewSession.getJobName())
                        .jobRequestId(interviewSession.getJobRequest().getId())
                        .jobSeekerName(interviewSession.getJobSeeker().getName())
                        .fromTimeInterval(interviewSession.getFromTimeInterval())
                        .toTimeInterval(interviewSession.getToTimeInterval())
                        .build()
                )
                .collect(Collectors.toList());
    }

}
