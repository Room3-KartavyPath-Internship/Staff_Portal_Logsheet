package com.sunbeam.logsheet.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CourseCoordinatorResponse {
	 private Long id;           
	    private String courseName; 
	    private String staffName;  
}
