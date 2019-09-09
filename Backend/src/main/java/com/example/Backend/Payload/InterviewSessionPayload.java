package com.example.Backend.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewSessionPayload {

    private String fromTimeInterval;
    private String toTimeInterval;
    private Long jobSeekerId;
    private Long jobRequestId;
    private String jobName;

}
