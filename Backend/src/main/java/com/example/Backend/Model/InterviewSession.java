package com.example.Backend.Model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;

@Getter
@Setter
@ToString
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
    @ManyToOne
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
