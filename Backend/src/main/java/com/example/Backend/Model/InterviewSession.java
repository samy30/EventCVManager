package com.example.Backend.Model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "interview_sessions")
public class InterviewSession extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromTimeInterval;
    private String toTimeInterval;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "jobSeeker_id")
    private User jobSeeker;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "jobRequest_id")
    private JobDemande jobRequest;

    private String jobName;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "enterprise_id")
    private User enterprise;

}
