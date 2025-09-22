
package com.sunbeam.logsheet.DTO;

import java.time.LocalDate;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LogsheetUpdateDTO {
	private Long staffId;
    private Long courseId;
    private Long moduleId;
    private Long topicId;
    private Long logsheetTypeId;
    private Long groupId;
    private String entryType;
    private LocalDate logDate;
    private String description;
    private String status;
}
