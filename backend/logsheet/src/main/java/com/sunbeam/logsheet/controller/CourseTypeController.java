package com.sunbeam.logsheet.controller;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.CourseTypeDTO;
import com.sunbeam.logsheet.entity.CourseType;
import com.sunbeam.logsheet.service.CourseTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-types")
public class CourseTypeController {

    @Autowired
    private CourseTypeService courseTypeService;

    @PostMapping
    public ResponseEntity<ApiResponse> addCourseType(@RequestBody CourseTypeDTO dto) {
        courseTypeService.addCourseType(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse("Course type created successfully ", true));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseType> getCourseType(@PathVariable Long id) {
        CourseType courseType = courseTypeService.getCourseType(id);
        return ResponseEntity.ok(courseType);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourseType(@PathVariable Long id, @RequestBody CourseTypeDTO courseTypeDTO) {
        return ResponseEntity.ok(courseTypeService.updateCourseType(id, courseTypeDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourseType(@PathVariable Long id) {
        return ResponseEntity.ok(courseTypeService.deleteCourseType(id));
    }

  
    @GetMapping
    public ResponseEntity<List<CourseType>> getAllCourseTypes() {
        return ResponseEntity.ok(courseTypeService.getAllCourseTypes());
    }
}
