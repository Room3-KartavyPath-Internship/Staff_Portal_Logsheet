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
	 private Long id;           // Coordinator ID
	    private String courseName; // Name of the course
	    private String staffName;  // Full name of the staff
}
