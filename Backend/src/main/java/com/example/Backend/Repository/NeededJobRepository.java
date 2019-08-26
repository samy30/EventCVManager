package com.example.Backend.Repository;

import com.example.Backend.Model.NeededJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NeededJobRepository extends JpaRepository<NeededJob, Long> {
    List<NeededJob> findByCreatedBy(Long userId);
}
