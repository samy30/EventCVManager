package com.example.Backend.Repository;

import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.JobOffer;
import com.example.Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobDemandeRepository extends JpaRepository<JobDemande, Long> {
    List<JobDemande> findByEnterprise(User enterprise);
    List<JobDemande> findBySender(User user);
    List<JobDemande> findByEnterpriseAndConfirmedByUser(User enterprise, boolean confirmed);
    List<JobDemande> findByJobOffer(JobOffer jobOffer);
//    List<JobDemande> findBySeenByEnterpriseAndEnterprise(boolean isSeen,User enterprise);
//    List<JobDemande> findBySenderAndStatusAndSeenByUser(User sender, String status, boolean seenByUser);
}
