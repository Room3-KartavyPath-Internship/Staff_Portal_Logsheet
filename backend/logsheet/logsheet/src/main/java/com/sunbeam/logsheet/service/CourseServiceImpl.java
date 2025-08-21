package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.CourseDTO;
import com.sunbeam.logsheet.entity.*;
import com.sunbeam.logsheet.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private BatchCycleRepository batchCycleRepository;

    @Autowired
    private PremisesRepository premisesRepository;

    @Autowired
    private CourseTypeRepository courseTypeRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CourseDTO createCourse(CourseDTO courseDTO) {
        Course course = mapDtoToEntity(courseDTO);
        Course saved = courseRepository.save(course);
        return mapEntityToDto(saved);
    }

    @Override
    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CourseDTO getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
        return mapEntityToDto(course);
    }

    @Override
    public CourseDTO updateCourse(Long id, CourseDTO courseDTO) {
        Course existing = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));

        existing.setName(courseDTO.getName());
        existing.setDescription(courseDTO.getDescription());
        existing.setStartDate(courseDTO.getStartDate());
        existing.setEndDate(courseDTO.getEndDate());

        // update relationships
        existing.setBatchCycle(batchCycleRepository.findById(courseDTO.getBatchCycleId())
                .orElseThrow(() -> new RuntimeException("BatchCycle not found with id " + courseDTO.getBatchCycleId())));
        existing.setPremise(premisesRepository.findById(courseDTO.getPremiseId())
                .orElseThrow(() -> new RuntimeException("Premises not found with id " + courseDTO.getPremiseId())));
        existing.setCourseType(courseTypeRepository.findById(courseDTO.getCourseTypeId())
                .orElseThrow(() -> new RuntimeException("CourseType not found with id " + courseDTO.getCourseTypeId())));

        Course updated = courseRepository.save(existing);
        return mapEntityToDto(updated);
    }

    @Override
    public void deleteCourse(Long id) {
        Course existing = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
        courseRepository.delete(existing);
    }

    // 🔹 Utility methods for mapping
    private Course mapDtoToEntity(CourseDTO dto) {
        Course course = new Course();
        course.setId(dto.getId());
        course.setName(dto.getName());
        course.setDescription(dto.getDescription());
        course.setStartDate(dto.getStartDate());
        course.setEndDate(dto.getEndDate());

        course.setBatchCycle(batchCycleRepository.findById(dto.getBatchCycleId())
                .orElseThrow(() -> new RuntimeException("BatchCycle not found with id " + dto.getBatchCycleId())));
        course.setPremise(premisesRepository.findById(dto.getPremiseId())
                .orElseThrow(() -> new RuntimeException("Premises not found with id " + dto.getPremiseId())));
        course.setCourseType(courseTypeRepository.findById(dto.getCourseTypeId())
                .orElseThrow(() -> new RuntimeException("CourseType not found with id " + dto.getCourseTypeId())));

        return course;
    }

    private CourseDTO mapEntityToDto(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setName(course.getName());
        dto.setDescription(course.getDescription());
        dto.setStartDate(course.getStartDate());
        dto.setEndDate(course.getEndDate());
        dto.setBatchCycleId(course.getBatchCycle().getId());
        dto.setPremiseId(course.getPremise().getId());
        dto.setCourseTypeId(course.getCourseType().getId());
        return dto;
    }
}
