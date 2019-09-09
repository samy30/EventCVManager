package com.example.Backend.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewCalendarPayload {

    private List<InterviewSessionPayload> interviewSessionPayloads;

}
