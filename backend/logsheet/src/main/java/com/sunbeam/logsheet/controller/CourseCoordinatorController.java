package com.sunbeam.logsheet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.CourseCoordinatorRequest;
import com.sunbeam.logsheet.DTO.CourseCoordinatorResponse;
import com.sunbeam.logsheet.service.CourseCoordinatorService;

@RestController
@RequestMapping("/api/course-coordinator")
public class CourseCoordinatorController {
	@Autowired
    private CourseCoordinatorService coordinatorService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> add(@RequestBody CourseCoordinatorRequest request) {
        return ResponseEntity.ok(coordinatorService.addCourseCoordinator(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @RequestBody CourseCoordinatorRequest request) {
        return ResponseEntity.ok(coordinatorService.updateCourseCoordinator(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        return ResponseEntity.ok(coordinatorService.deleteCourseCoordinator(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseCoordinatorResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(coordinatorService.getCourseCoordinatorById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CourseCoordinatorResponse>> getAll() {
        return ResponseEntity.ok(coordinatorService.getAllCourseCoordinators());
    }
}
