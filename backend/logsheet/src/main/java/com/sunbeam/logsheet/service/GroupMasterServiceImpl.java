package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.GroupRequestDTO;
import com.sunbeam.logsheet.DTO.GroupResponseDTO;
import com.sunbeam.logsheet.entity.Course;
import com.sunbeam.logsheet.entity.GroupMaster;
import com.sunbeam.logsheet.repository.CourseRepository;
import com.sunbeam.logsheet.repository.GroupMasterRepository;

import jakarta.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class GroupMasterServiceImpl implements GroupMasterService {

    @Autowired
    private GroupMasterRepository groupMasterRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ApiResponse<?> addGroup(GroupRequestDTO dto) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        GroupMaster group = modelMapper.map(dto, GroupMaster.class);
        course.addGroup(group); 

        groupMasterRepository.save(group);

        return new ApiResponse<>("Group added successfully", true);
    }

    @Override
    public ApiResponse<?> updateGroup(Long id, GroupRequestDTO dto) {
        GroupMaster group = groupMasterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        group.setName(dto.getName());
        group.setDescription(dto.getDescription());

        groupMasterRepository.save(group);
        return new ApiResponse<>("Group updated successfully", true);
    }

    @Override
    public ApiResponse<?> deleteGroup(Long id) {
        GroupMaster group = groupMasterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (group.getCourse() != null) {
            group.getCourse().removeGroup(group);
        }

        groupMasterRepository.delete(group);
        return new ApiResponse<>("Group deleted successfully", true);
    }

    @Override
    public List<GroupResponseDTO> getAllGroups() {
        return groupMasterRepository.findAll()
                .stream()
                .map(group -> modelMapper.map(group, GroupResponseDTO.class))
                .collect(Collectors.toList());
    }
}
