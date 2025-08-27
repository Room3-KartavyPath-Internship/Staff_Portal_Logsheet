package com.sunbeam.logsheet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.CourseCoordinatorRequest;
import com.sunbeam.logsheet.DTO.CourseCoordinatorResponse;
import com.sunbeam.logsheet.entity.Course;
import com.sunbeam.logsheet.entity.CourseCoordinator;
import com.sunbeam.logsheet.entity.Staff;
import com.sunbeam.logsheet.repository.CourseCoordinatorRepository;
import com.sunbeam.logsheet.repository.CourseRepository;
import com.sunbeam.logsheet.repository.StaffRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CourseCoordinatorServiceImpl implements CourseCoordinatorService{
	@Autowired
    private CourseCoordinatorRepository coordinatorRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StaffRepository staffRepository;
    @Override
    public ApiResponse addCourseCoordinator(CourseCoordinatorRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        CourseCoordinator coordinator = new CourseCoordinator();
        coordinator.setCourse(course);
        coordinator.setStaff(staff);

        coordinatorRepository.save(coordinator);
        return new ApiResponse("Course Coordinator added successfully", true);
    }

    @Override
    public ApiResponse updateCourseCoordinator(Long id, CourseCoordinatorRequest request) {
        CourseCoordinator coordinator = coordinatorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course Coordinator not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        coordinator.setCourse(course);
        coordinator.setStaff(staff);

        coordinatorRepository.save(coordinator);
        return new ApiResponse("Course Coordinator updated successfully", true);
    }

    @Override
    public ApiResponse deleteCourseCoordinator(Long id) {
        CourseCoordinator coordinator = coordinatorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course Coordinator not found"));

        coordinatorRepository.delete(coordinator);
        return new ApiResponse("Course Coordinator deleted successfully", true);
    }

    @Override
    public CourseCoordinatorResponse getCourseCoordinatorById(Long id) {
        CourseCoordinator coordinator = coordinatorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course Coordinator not found"));

        return mapEntityToResponse(coordinator);
    }

    @Override
    public List<CourseCoordinatorResponse> getAllCourseCoordinators() {
        return coordinatorRepository.findAll()
                .stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    private CourseCoordinatorResponse mapEntityToResponse(CourseCoordinator coordinator) {
        CourseCoordinatorResponse response = new CourseCoordinatorResponse();
        response.setId(coordinator.getId());
        response.setCourseName(coordinator.getCourse().getName()); // Assuming Course entity has getName()
        response.setStaffName(coordinator.getStaff().getFirstName() + " " + coordinator.getStaff().getLastName());
        return response;
    }
}
