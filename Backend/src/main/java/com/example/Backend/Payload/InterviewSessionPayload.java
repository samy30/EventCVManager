package com.example.Backend.Payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InterviewSessionPayload {

    private String fromTimeInterval;
    private String toTimeInterval;
    private Long jobRequestId;
    private String enterpriseUsername;
    private String jobSeekerName;
    private String jobName;

}
