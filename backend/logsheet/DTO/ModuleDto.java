package com.sunbeam.logsheet.DTO;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModuleDto {
    private Long id;
    private String title;
    private String description;
    private int theoryHours;
    private int practicalHours;
    private Long moduleRouterId;
    private Set<Long> subjectIds; // store Subject IDs
}
