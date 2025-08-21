


package com.sunbeam.logsheet.controller;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.SectionDto;
import com.sunbeam.logsheet.DTO.SubjectDto;
import com.sunbeam.logsheet.service.CourseModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class CourseModuleController {

    @Autowired
    private CourseModuleService service;

    // ---------------- SUBJECT ----------------
    @PostMapping("/subject")
    public ResponseEntity<ApiResponse> addSubject(@RequestBody SubjectDto dto) {
        service.addSubject(dto);
        return ResponseEntity.ok(new ApiResponse("Subject added successfully", true));
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<SubjectDto>> getSubjects() {
        return ResponseEntity.ok(service.getAllSubjects());
    }

    @PutMapping("/subject/{id}")
    public ResponseEntity<ApiResponse> updateSubject(@PathVariable Long id, @RequestBody SubjectDto dto) {
        service.updateSubject(id, dto);
        return ResponseEntity.ok(new ApiResponse("Subject updated successfully", true));
    }

    @DeleteMapping("/subject/{id}")
    public ResponseEntity<ApiResponse> deleteSubject(@PathVariable Long id) {
        service.deleteSubject(id);
        return ResponseEntity.ok(new ApiResponse("Subject deleted successfully", true));
    }

    // ---------------- SECTION ----------------
    @PostMapping("/section")
    public ResponseEntity<ApiResponse> addSection(@RequestBody SectionDto dto) {
        service.addSection(dto);
        return ResponseEntity.ok(new ApiResponse("Section added successfully", true));
    }

    @GetMapping("/sections")
    public ResponseEntity<List<SectionDto>> getSections() {
        return ResponseEntity.ok(service.getAllSections());
    }

    @PutMapping("/section/{id}")
    public ResponseEntity<ApiResponse> updateSection(@PathVariable Long id, @RequestBody SectionDto dto) {
        service.updateSection(id, dto);
        return ResponseEntity.ok(new ApiResponse("Section updated successfully", true));
    }

    @DeleteMapping("/section/{id}")
    public ResponseEntity<ApiResponse> deleteSection(@PathVariable Long id) {
        service.deleteSection(id);
        return ResponseEntity.ok(new ApiResponse("Section deleted successfully", true));
    }
}

