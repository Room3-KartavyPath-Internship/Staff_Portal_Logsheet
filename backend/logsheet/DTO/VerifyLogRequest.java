package com.sunbeam.logsheet.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyLogRequest {
    private Long verifierId; 
    private String verificationStatus; 
    private LocalDateTime verifiedAt; 
}
