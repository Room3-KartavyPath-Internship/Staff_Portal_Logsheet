
package com.sunbeam.logsheet.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LogsheetUpdateDTO {
    private Long id;            
    private Long topicId;       
    private Long groupId;       
    private String entryType;   
    private String description; 
}
