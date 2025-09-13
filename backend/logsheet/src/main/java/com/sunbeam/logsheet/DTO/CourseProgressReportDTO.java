package com.sunbeam.logsheet.DTO;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseProgressReportDTO {
    private String courseName;
    private String moduleTitle;
    private LocalDate courseStartDate;
    private LocalDate courseEndDate;
    private int theoryHours;
    private int practicalHours;
    private int totalHours;
    private String facultyName;
}
