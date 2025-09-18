


package com.sunbeam.logsheet.controller;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.ModuleDto;
import com.sunbeam.logsheet.DTO.SectionDto;
import com.sunbeam.logsheet.DTO.SubjectDto;
import com.sunbeam.logsheet.DTO.TopicDto;
import com.sunbeam.logsheet.entity.Topic;
import com.sunbeam.logsheet.service.CourseModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/modules")
public class CourseModuleController {

    @Autowired
    private CourseModuleService service;

    @PostMapping("/subject")
    public ResponseEntity<ApiResponse<?>> addSubject(@RequestBody SubjectDto dto) {
        service.addSubject(dto);
        return ResponseEntity.ok(new ApiResponse<>("Subject added successfully", true));
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<SubjectDto>> getSubjects() {
        return ResponseEntity.ok(service.getAllSubjects());
    }

    @PutMapping("/subject/{id}")
    public ResponseEntity<ApiResponse<?>> updateSubject(@PathVariable Long id, @RequestBody SubjectDto dto) {
        service.updateSubject(id, dto);
        return ResponseEntity.ok(new ApiResponse<>("Subject updated successfully", true));
    }

    @DeleteMapping("/subject/{id}")
    public ResponseEntity<ApiResponse<?>> deleteSubject(@PathVariable Long id) {
        service.deleteSubject(id);
        return ResponseEntity.ok(new ApiResponse<>("Subject deleted successfully", true));
    }


    @PostMapping("/section")
    public ResponseEntity<ApiResponse<?>> addSection(@RequestBody SectionDto dto) {
        service.addSection(dto);
        return ResponseEntity.ok(new ApiResponse<>("Section added successfully", true));
    }

    @GetMapping("/sections")
    public ResponseEntity<List<SectionDto>> getSections() {
        return ResponseEntity.ok(service.getAllSections());
    }

    @PutMapping("/section/{id}")
    public ResponseEntity<ApiResponse<?>> updateSection(@PathVariable Long id, @RequestBody SectionDto dto) {
        service.updateSection(id, dto);
        return ResponseEntity.ok(new ApiResponse<>("Section updated successfully", true));
    }

    @DeleteMapping("/section/{id}")
    public ResponseEntity<ApiResponse<?>> deleteSection(@PathVariable Long id) {
        service.deleteSection(id);
        return ResponseEntity.ok(new ApiResponse<>("Section deleted successfully", true));
    }
    
    
    @PostMapping("/topic")
    public ResponseEntity<ApiResponse<?>> addTopic(@RequestBody TopicDto dto) {
        ApiResponse<?> response = service.addTopic(dto);
        return ResponseEntity.ok(response); // ✅ message included
    }

    @GetMapping("/topics")
    public ResponseEntity<List<TopicDto>> getTopics() {
        return ResponseEntity.ok(service.getAllTopics());
    }
    
    @GetMapping("/topic/{id}")
    public ResponseEntity<TopicDto> getTopicById(@PathVariable Long id) {
        TopicDto dto = service.getTopicById(id);  // Call service method
        return ResponseEntity.ok(dto);
    }


    @PutMapping("/topic/{id}")
    public ResponseEntity<ApiResponse<?>> updateTopic(@PathVariable Long id, @RequestBody TopicDto dto) {
        ApiResponse<?> response = service.updateTopic(id, dto);
        return ResponseEntity.ok(response); // ✅ message included
    }

    @DeleteMapping("/topic/{id}")
    public ResponseEntity<ApiResponse<?>> deleteTopic(@PathVariable Long id) {
        ApiResponse<?> response = service.deleteTopic(id);
        return ResponseEntity.ok(response); // ✅ message included
    }
    
    @PostMapping("/module")
    public ResponseEntity<ApiResponse<?>> addModule(@RequestBody ModuleDto dto) {
        service.addModule(dto);
        return ResponseEntity.ok(new ApiResponse<>("Module added successfully",true));
    }

    @GetMapping("/modules")
    public ResponseEntity<List<ModuleDto>> getModules() {
        return ResponseEntity.ok(service.getAllModules());
    }

    @PutMapping("/module/{id}")
    public ResponseEntity<ApiResponse<?>> updateModule(@PathVariable Long id, @RequestBody ModuleDto dto) {
        service.updateModule(id, dto);
        return ResponseEntity.ok(new ApiResponse<>("Module updated successfully", true));
    }

    @DeleteMapping("/module/{id}")
    public ResponseEntity<ApiResponse<?>> deleteModule(@PathVariable Long id) {
        service.deleteModule(id);
        return ResponseEntity.ok(new ApiResponse<>("Module deleted successfully",true));
    }


}

