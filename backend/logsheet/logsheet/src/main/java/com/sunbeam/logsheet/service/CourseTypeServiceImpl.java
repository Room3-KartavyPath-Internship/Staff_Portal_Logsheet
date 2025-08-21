package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.CourseTypeDTO;
import com.sunbeam.logsheet.entity.CourseType;
import com.sunbeam.logsheet.repository.CourseTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseTypeServiceImpl implements CourseTypeService {

    @Autowired
    private CourseTypeRepository courseTypeRepository;

    @Override
    public CourseType addCourseType(CourseTypeDTO dto) {
        courseTypeRepository.findByTitle(dto.getTitle())
                .ifPresent(ct -> {
                    throw new RuntimeException("Course type with title '" + dto.getTitle() + "' already exists");
                });

        CourseType courseType = new CourseType();
        courseType.setTitle(dto.getTitle());
        courseType.setDescription(dto.getDescription());
        return courseTypeRepository.save(courseType);
    }

    @Override
    public CourseType getCourseType(Long id) {
        return courseTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course type with ID " + id + " not found"));
    }
    
    @Override
    public ApiResponse updateCourseType(Long id, CourseTypeDTO courseTypeDTO) {
        CourseType existing = courseTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course type not found with id: " + id));

        existing.setTitle(courseTypeDTO.getTitle());
        existing.setDescription(courseTypeDTO.getDescription());
        courseTypeRepository.save(existing);
        return new ApiResponse("Updated Successfully",true);
    }


    @Override
    public ApiResponse deleteCourseType(Long id) {
        CourseType courseType = courseTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course type with ID " + id + " not found"));
        courseTypeRepository.delete(courseType);
        return new ApiResponse("Successfully deleted",true);
    }

	@Override
	public List<CourseType> getAllCourseTypes() {
		 return courseTypeRepository.findAll();
		
	}

}
