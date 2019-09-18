package com.example.Backend.Service;

import com.example.Backend.Model.InterviewSession;
import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.Status;
import com.example.Backend.Model.User;
import com.example.Backend.Payload.InterviewSessionPayload;
import com.example.Backend.Repository.InterviewSessionRepository;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class InterviewService {

    @Autowired
    private InterviewSessionRepository interviewSessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobDemandeRepository jobRequestRepository;

    public void createInterviewCalendar() {
        List<JobDemande> jobRequests = jobRequestRepository.findAllByStatus(Status.ACCEPTED);
        mapJobRequestsToInterviewSessions(jobRequests);
    }

    private String padWithZero(String timeString) {
        return timeString.length() < 5 ? '0' + timeString : timeString;
    }

    public void mapJobRequestsToInterviewSessions(List<JobDemande> jobRequests) {
        List<String> leftTimeIntervals = new ArrayList<>();
        List<String> rightTimeIntervals = new ArrayList<>();
        IntStream.range(0, jobRequests.size())
                .forEach(index -> {
                    if (index % 2 == 0) {
                        leftTimeIntervals.add(padWithZero(( index / 2 + 8) + ":00"));
                        rightTimeIntervals.add(padWithZero((index / 2 + 8) + ":30"));
                    } else {
                        leftTimeIntervals.add(padWithZero((index / 2 + 8) + ":30"));
                        rightTimeIntervals.add(padWithZero((index / 2 + 9) + ":00"));
                    }
                });
        IntStream.range(0, jobRequests.size())
                .forEach(index -> {
                    JobDemande jobRequest = jobRequests.get(index);
                    jobRequest = jobRequestRepository.findById(jobRequest.getId()).get();
                    User jobSeeker = userRepository.findByJobRequestId(jobRequest.getId());
                    User enterprise = userRepository.findByJobRequests(jobRequest);
                    InterviewSession interviewSession = InterviewSession
                            .builder()
                            .fromTimeInterval(leftTimeIntervals.get(index))
                            .toTimeInterval(rightTimeIntervals.get(index))
                            .jobSeeker(jobSeeker)
                            .jobRequest(jobRequest)
                            .jobName(jobRequest.getJobOffer().getJob().getName())
                            .enterprise(enterprise)
                            .build();
                    interviewSessionRepository.save(interviewSession);
                    enterprise.getEnterpriseInterviewSessions().add(interviewSession);
                    jobSeeker.getJobSeekerInterviewSessions().add(interviewSession);
                    jobRequest.setInterviewSession(interviewSession);
                    userRepository.save(enterprise);
                    userRepository.save(jobSeeker);
                    jobRequestRepository.save(jobRequest);
                });
    }

    public List<InterviewSessionPayload> getInterviewSessions() {
        return mapInterviewSessionsToInterviewSessionsPayloads(
                interviewSessionRepository
                    .findAll()
        );
    }

    public List<InterviewSessionPayload> getCandidateInterviewSessions(String username) {
        return mapInterviewSessionsToInterviewSessionsPayloads(
                interviewSessionRepository
                    .findAllByJobSeeker_Username(username)
        );

    }

    public List<InterviewSessionPayload> getEnterpriseInterviewSessions(String username) {
        return mapInterviewSessionsToInterviewSessionsPayloads(
                interviewSessionRepository
                    .findAllByEnterprise_Username(username)
        );
    }

    private List<InterviewSessionPayload> mapInterviewSessionsToInterviewSessionsPayloads(List<InterviewSession> interviewSessions) {
        return interviewSessions
                .stream()
                .map(interviewSession -> mapInterviewSessionToInterviewSessionPayload(interviewSession))
                .collect(Collectors.toList());
    }

    private InterviewSessionPayload mapInterviewSessionToInterviewSessionPayload(InterviewSession interviewSession) {
        return InterviewSessionPayload
                .builder()
                .enterpriseUsername(interviewSession.getEnterprise().getUsername())
                .jobName(interviewSession.getJobName())
                .jobRequestId(interviewSession.getJobRequest().getId())
                .jobSeekerName(interviewSession.getJobSeeker().getName())
                .fromTimeInterval(interviewSession.getFromTimeInterval())
                .toTimeInterval(interviewSession.getToTimeInterval())
                .build();
    }
}
