package com.example.Backend.Repository;

import com.example.Backend.Model.Job;
import com.example.Backend.Model.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
    List<JobOffer> findByCreatedBy(Long userId);
    List<JobOffer> findByName(Job name);
    long countByCreatedBy(Long userId);
}
