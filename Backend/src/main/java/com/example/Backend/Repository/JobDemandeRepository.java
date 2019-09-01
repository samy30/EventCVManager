package com.example.Backend.Repository;

import com.example.Backend.Model.JobDemande;
import com.example.Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobDemandeRepository extends JpaRepository<JobDemande, Long> {
    List<JobDemande> findByEnterprise(User enterprise);
    List<JobDemande> findBySender(User user);
}
