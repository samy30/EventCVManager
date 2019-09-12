package com.example.Backend.Payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobRequestPayload {

    private Long id;
    private Long jobOfferId;
    private Long enterpriseId;
    private Long jobSeekerId;
    private String enterpriseUsername;
    private String jobSeekerName;
    private String jobName;

}
