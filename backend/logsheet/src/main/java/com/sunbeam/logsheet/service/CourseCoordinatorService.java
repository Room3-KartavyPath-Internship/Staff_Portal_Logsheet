package com.sunbeam.logsheet.service;

import java.util.List;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.CourseCoordinatorRequest;
import com.sunbeam.logsheet.DTO.CourseCoordinatorResponse;

public interface CourseCoordinatorService {
	ApiResponse addCourseCoordinator(CourseCoordinatorRequest request);

    ApiResponse updateCourseCoordinator(Long id, CourseCoordinatorRequest request);

    ApiResponse deleteCourseCoordinator(Long id);

    CourseCoordinatorResponse getCourseCoordinatorById(Long id);

    List<CourseCoordinatorResponse> getAllCourseCoordinators();
}
