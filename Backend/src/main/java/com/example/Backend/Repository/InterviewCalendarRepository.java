package com.example.Backend.Repository;

import com.example.Backend.Model.InterviewCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewCalendarRepository extends JpaRepository<InterviewCalendar, Long> {
    InterviewCalendar findByEnterpriseUsername(String username);
}
