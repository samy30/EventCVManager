package com.example.Backend.Repository;

import com.example.Backend.Model.Job;
import com.example.Backend.Model.JobOffer;
import com.example.Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
    List<JobOffer> findByCreatedBy(Long userId);
    List<JobOffer> findAllByEnterpriseUsername(String username);
    List<JobOffer> findAllByEnterprise(User user);
    List<JobOffer> findByJob(Job job);
    JobOffer findByJobRequestsId(Long jobRequestId);
    long countByCreatedBy(Long userId);
    long countByJob(Job job);
}
