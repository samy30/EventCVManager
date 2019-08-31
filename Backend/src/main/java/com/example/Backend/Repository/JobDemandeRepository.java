package com.example.Backend.Repository;

import com.example.Backend.Model.JobDemande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobDemandeRepository extends JpaRepository<JobDemande, Long> {

}
