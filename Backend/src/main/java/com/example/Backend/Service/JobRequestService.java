package com.example.Backend.Service;

import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.JobOffer;
import com.example.Backend.Model.User;
import com.example.Backend.Payload.JobRequestPayload;
import com.example.Backend.Repository.JobDemandeRepository;
import com.example.Backend.Repository.JobOfferRepository;
import com.example.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobRequestService {

    @Autowired
    private JobDemandeRepository jobRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobOfferRepository jobOfferRepository;

    public List<JobRequestPayload> getJobRequestsAcceptedByEnterprise(Boolean isConfirmed) {
        return jobRequestRepository
                .findAllByConfirmedByEntreprise(isConfirmed)
                .stream()
                .map(jobRequest -> {
                    User enterprise = userRepository.findByJobRequestsId(jobRequest.getId());
                    User jobSeeker = userRepository.findByJobRequestId(jobRequest.getId());
                    JobOffer jobOffer = jobOfferRepository.findByJobRequestsId(jobRequest.getId());
                    return JobRequestPayload
                            .builder()
                            .id(jobRequest.getId())
                            .enterpriseId(enterprise.getId())
                            .enterpriseUsername(enterprise.getUsername())
                            .jobName(jobOffer.getJob().getName())
                            .jobOfferId(jobOffer.getId())
                            .jobSeekerId(jobSeeker.getId())
                            .jobSeekerName(jobSeeker.getName())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
