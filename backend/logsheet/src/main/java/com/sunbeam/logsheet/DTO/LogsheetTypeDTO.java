package com.sunbeam.logsheet.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class LogsheetTypeDTO {
    private Long id;
    private String title;
    private String description;
    private Double theoryPercent;
    private Double practicalPercent;
    private boolean topicRequired; 
    private boolean groupRequired; 
}
