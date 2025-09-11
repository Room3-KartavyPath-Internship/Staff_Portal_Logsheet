package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.CourseProgressReportDTO;
import com.sunbeam.logsheet.repository.CourseProgressReportRepository;
import com.sunbeam.logsheet.service.CourseProgressReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseProgressReportServiceImpl implements CourseProgressReportService {

    @Autowired
    private CourseProgressReportRepository repository;

    @Override
    public List<CourseProgressReportDTO> getCourseProgressReportByCourseName(String courseName) {
        return repository.getCourseProgressReportByCourseName(courseName);
    }
}
