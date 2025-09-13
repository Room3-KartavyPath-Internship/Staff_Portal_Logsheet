package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.CourseProgressReportDTO;
import java.util.List;

public interface CourseProgressReportService {
    List<CourseProgressReportDTO> getCourseProgressReportByCourseName(String courseName);
}
