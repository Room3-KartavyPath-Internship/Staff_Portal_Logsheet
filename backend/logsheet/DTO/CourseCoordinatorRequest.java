package com.sunbeam.logsheet.DTO;

import java.time.LocalDate;

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
public class CourseCoordinatorRequest {
	private Long courseId;
    private Long staffId;
}
