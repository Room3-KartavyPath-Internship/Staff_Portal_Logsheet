package com.sunbeam.logsheet.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ApproveLogRequest {
    private Long approverId; 
    private String approvalStatus; 
    private String comment; 
    private LocalDateTime approvedAt; 
}
