package com.sunbeam.logsheet.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupRequestDTO {
    private String name;
    private String description;
    private Long courseId;
}
