package com.example.Backend.Repository;

import com.example.Backend.Model.InterviewSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {

    List<InterviewSession> findAllByJobSeeker_Username(String username);
    List<InterviewSession> findAllByEnterprise_Username(String username);
}
