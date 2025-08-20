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

    private Long batchCycleId;   // reference to BatchCycle
    private Long premiseId;      // reference to Premises
    private Long courseTypeId;   // reference to CourseType

    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
}
