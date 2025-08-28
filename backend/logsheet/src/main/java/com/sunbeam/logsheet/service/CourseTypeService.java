package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.CourseTypeDTO;
import com.sunbeam.logsheet.entity.CourseType;
import java.util.List;

public interface CourseTypeService {
    CourseType addCourseType(CourseTypeDTO dto);
    CourseType getCourseType(Long id);
    ApiResponse<?> updateCourseType(Long id, CourseTypeDTO courseTypeDTO);
    ApiResponse<?> deleteCourseType(Long id);
    List<CourseType> getAllCourseTypes();
}
