package com.sunbeam.logsheet.DTO;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CourseDTO {
    private Long id;
    private String name;

    private Long batchCycleId;   
    private Long premiseId;      
    private Long courseTypeId;   
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
}
