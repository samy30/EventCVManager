package com.example.Backend.Repository;

import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.JobOffer;
import com.example.Backend.Model.Status;
import com.example.Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.Backend.Model.Status.ACCEPTED;

@Repository
public interface JobDemandeRepository extends JpaRepository<JobDemande, Long> {
    List<JobDemande> findByEnterprise(User enterprise);
    List<JobDemande> findBySender(User user);
    List<JobDemande> findByEnterpriseAndConfirmedByUser(User enterprise, boolean confirmed);
    List<JobDemande> findAllByStatus(Status status);

    @Query(value = "SELECT jR FROM JobDemande jR LEFT JOIN FETCH jR.sender LEFT JOIN FETCH jR.enterprise where jR.status= :status and jR.confirmedByUser= :confirmedByUser")
    List<JobDemande> findAllByStatusAndAndConfirmedByUser(@Param("status") Status status, @Param("confirmedByUser") Boolean confirmedByUser);

    List<JobDemande> findAllByEnterprise_UsernameAndStatus(String username, Status status);
    List<JobDemande> findAllBySender_UsernameAndStatus(String username, Status status);
    List<JobDemande> findByJobOffer(JobOffer jobOffer);
    JobDemande findByCv_Id(Long resumeId);

//    @Query(value = "SELECT jR FROM job_demandes jR LEFT JOIN FETCH jR.jobOffer jO LEFT JOIN FETCH jO.job where jR.id = :id", nativeQuery=true)
//    JobDemande findByIdAndFetchJobOfferAndJobName(@Param("id") Long jobRequestId);

//    List<JobDemande> findBySeenByEnterpriseAndEnterprise(boolean isSeen,User enterprise);
//    List<JobDemande> findBySenderAndStatusAndSeenByUser(User sender, String status, boolean seenByUser);
}
