package com.example.Backend.Service;

import com.example.Backend.Model.InterviewCalendar;
import com.example.Backend.Model.InterviewSession;
import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.User;
import com.example.Backend.Payload.InterviewCalendarPayload;
import com.example.Backend.Payload.InterviewSessionPayload;
import com.example.Backend.Repository.InterviewCalendarRepository;
import com.example.Backend.Repository.InterviewSessionRepository;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewService {

    @Autowired
    private InterviewSessionRepository interviewSessionRepository;

    @Autowired
    private InterviewCalendarRepository interviewCalendarRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobDemandeRepository jobRequestRepository;

    public InterviewCalendar createInterviewCalendar(String username, InterviewCalendarPayload interviewCalendarPayload) {
        List<InterviewSession> interviewSessions = mapInterviewSessionPayloadsToInterviewSessions(
                interviewCalendarPayload.getInterviewSessionPayloads()
        );
        User entreprise = userRepository.findByUsername(username).get();
        InterviewCalendar interviewCalendar =
                InterviewCalendar
                        .builder()
                        .interviewSessions(interviewSessions)
                        .enterprise(entreprise)
                        .build();
        entreprise.setInterviewCalendar(interviewCalendar);
        userRepository.save(entreprise);
        return interviewCalendarRepository.findByEnterpriseUsername(username);
    }

    public InterviewSession mapInterviewSessionPayloadToInterviewSession(InterviewSessionPayload interviewSessionPayload) {
        User jobSeeker = userRepository.findById(interviewSessionPayload.getJobSeekerId()).get();
        JobDemande jobRequest = jobRequestRepository.findById(interviewSessionPayload.getJobRequestId()).get();
        return InterviewSession
                .builder()
                .fromTimeInterval(interviewSessionPayload.getFromTimeInterval())
                .toTimeInterval(interviewSessionPayload.getToTimeInterval())
                .jobSeeker(jobSeeker)
                .jobRequest(jobRequest)
                .jobName(interviewSessionPayload.getJobName())
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
}
