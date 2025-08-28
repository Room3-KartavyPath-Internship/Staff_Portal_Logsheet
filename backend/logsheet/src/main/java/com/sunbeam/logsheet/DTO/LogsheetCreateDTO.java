package com.sunbeam.logsheet.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class LogsheetCreateDTO {
    private Long staffId;
    private Long courseId;
    private Long moduleId;
    private Long topicId;
    private Long logsheetTypeId;
    private Long groupId;
    private String entryType;
    private String description;
}
