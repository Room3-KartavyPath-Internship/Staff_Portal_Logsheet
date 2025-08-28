package com.sunbeam.logsheet.DTO;



import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class SectionDto {
    private Long id;
    private String name;
    private Long subjectId;
    
    public SectionDto(Long id, String name, Long subjectId) {
        this.id = id;
        this.name = name;
        this.subjectId = subjectId;
    }
}
