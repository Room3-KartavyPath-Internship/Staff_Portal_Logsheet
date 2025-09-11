package com.sunbeam.logsheet.controller;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.CourseProgressReportDTO;
import com.sunbeam.logsheet.service.CourseProgressReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class CourseProgressReportController {

    @Autowired
    private CourseProgressReportService reportService;

    @GetMapping("/course-progress/{courseName}")
    public ResponseEntity<ApiResponse<?>> getCourseProgressReport(
            @PathVariable String courseName) {

        List<CourseProgressReportDTO> reports = reportService.getCourseProgressReportByCourseName(courseName);

        return ResponseEntity.ok(new ApiResponse<>("Course Progress Report for fetched successfully",true, reports));
    }

}
