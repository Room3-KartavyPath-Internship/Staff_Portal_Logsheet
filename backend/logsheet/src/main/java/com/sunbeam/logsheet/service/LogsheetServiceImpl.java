package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.entity.*;
import com.sunbeam.logsheet.repository.*;
import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.custom_exceptions.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LogsheetServiceImpl implements LogsheetService {

    @Autowired
    private LogsheetRepository repository;
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private ModuleRepository moduleRepository;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private LogsheetTypeRepository logsheetTypeRepository;
    @Autowired
    private GroupMasterRepository groupRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public ApiResponse<LogsheetDTO> addLogsheet(LogsheetDTO dto) {
        Logsheet entity = mapDtoToEntity(dto);
        entity.setStatus(Logsheet.Status.New);
        Logsheet saved = repository.save(entity);
        return new ApiResponse<>("Logsheet added successfully", true, mapper.map(saved, LogsheetDTO.class));
    }

    @Override
    public ApiResponse<List<LogsheetDTO>> getAllLogsheets() {
        List<LogsheetDTO> list = repository.findAll()
                .stream()
                .map(e -> mapper.map(e, LogsheetDTO.class))
                .collect(Collectors.toList());
        return new ApiResponse<>("All logsheets fetched", true, list);
    }

    @Override
    public ApiResponse<LogsheetDTO> getLogsheetById(Long id) {
        Logsheet entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logsheet not found with id: " + id));
        return new ApiResponse<>("Logsheet found", true, mapper.map(entity, LogsheetDTO.class));
    }

    @Override
    public ApiResponse<LogsheetDTO> updateLogsheet(Long id, LogsheetDTO dto) {
        Logsheet existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logsheet not found with id: " + id));

 
        Logsheet entity = mapDtoToEntity(dto);
        entity.setId(existing.getId());
        Logsheet updated = repository.save(entity);

        return new ApiResponse<>("Logsheet updated successfully", true, mapper.map(updated, LogsheetDTO.class));
    }

    @Override
    public ApiResponse<Boolean> deleteLogsheet(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Logsheet not found with id: " + id);
        }
        repository.deleteById(id);
        return new ApiResponse<>("Logsheet deleted successfully", true);
    }

    @Override
    public ApiResponse<LogsheetDTO> verifyLog(Long id, VerifyLogRequest request) {
        Logsheet entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logsheet not found with id: " + id));

        Staff verifier = staffRepository.findById(request.getVerifierId())
                .orElseThrow(() -> new ResourceNotFoundException("Verifier not found with id: " + request.getVerifierId()));

        entity.setVerifiedBy(verifier);
        entity.setVerifiedAt(request.getVerifiedAt() != null ? request.getVerifiedAt() : LocalDateTime.now());

        if ("Verified".equalsIgnoreCase(request.getVerificationStatus())) {
            entity.setVerificationStatus(Logsheet.VerificationStatus.Verified);
            entity.setStatus(Logsheet.Status.Verified);
        } else {
            entity.setVerificationStatus(Logsheet.VerificationStatus.Rejected);
            entity.setStatus(Logsheet.Status.Rejected);
        }

        Logsheet updated = repository.save(entity);
        return new ApiResponse<>("Logsheet verification updated", true, mapper.map(updated, LogsheetDTO.class));
    }

    @Override
    public ApiResponse<LogsheetDTO> approveLog(Long id, ApproveLogRequest request) {
        Logsheet entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logsheet not found with id: " + id));

        Staff approver = staffRepository.findById(request.getApproverId())
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found with id: " + request.getApproverId()));

        entity.setApprovedBy(approver);
        entity.setApprovedAt(request.getApprovedAt() != null ? request.getApprovedAt() : LocalDateTime.now());

        if ("Approved".equalsIgnoreCase(request.getApprovalStatus())) {
            entity.setApprovalStatus(Logsheet.ApprovalStatus.Approved);
            entity.setStatus(Logsheet.Status.Approved);
        } else {
            entity.setApprovalStatus(Logsheet.ApprovalStatus.Rejected);
            entity.setStatus(Logsheet.Status.Rejected);
        }

        Logsheet updated = repository.save(entity);
        return new ApiResponse<>("Logsheet approval updated", true, mapper.map(updated, LogsheetDTO.class));
    }


    private Logsheet mapDtoToEntity(LogsheetDTO dto) {
        Logsheet entity = mapper.map(dto, Logsheet.class);

        entity.setStaff(staffRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + dto.getStaffId())));
        entity.setCourse(courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + dto.getCourseId())));
        entity.setModule(moduleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + dto.getModuleId())));
        entity.setTopic(dto.getTopicId() != null
                ? topicRepository.findById(dto.getTopicId())
                        .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + dto.getTopicId()))
                : null);
        entity.setLogsheetType(logsheetTypeRepository.findById(dto.getLogsheetTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("LogsheetType not found with id: " + dto.getLogsheetTypeId())));
        entity.setGroup(dto.getGroupId() != null
                ? groupRepository.findById(dto.getGroupId())
                        .orElseThrow(() -> new ResourceNotFoundException("Group not found with id: " + dto.getGroupId()))
                : null);

        return entity;
    }
}

