package com.sunbeam.logsheet.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class LogsheetDTO {
    private Long id;

    private Long staffId;
    private Long courseId;
    private Long moduleId;
    private Long topicId; 
    private Long logsheetTypeId;
    private Long groupId; 

    private String entryType; 
    private LocalDateTime logDate;
    private String description;

   
    private String status; 
    private Long verifiedById;
    private LocalDateTime verifiedAt;
    private String verificationStatus; 
    private Long approvedById;
    private LocalDateTime approvedAt;
    private String approvalStatus; 
}
