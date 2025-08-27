package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.entity.*;
import com.sunbeam.logsheet.repository.*;
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
    public ApiResponse<LogsheetDTO> addLogsheet(LogsheetCreateDTO dto) {
        Logsheet entity = mapCreateDtoToEntity(dto);
        entity.setStatus(Logsheet.Status.New);
        entity.setVerificationStatus(Logsheet.VerificationStatus.Pending);
        entity.setApprovalStatus(Logsheet.ApprovalStatus.Pending);

        Logsheet saved = repository.save(entity);
        return new ApiResponse<>("Logsheet added successfully", true, mapEntityToDto(saved));
    }
    

    @Override
    public ApiResponse<List<LogsheetDTO>> getAllLogsheets() {
        List<LogsheetDTO> list = repository.findAll()
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
        return new ApiResponse<>("All logsheets fetched", true, list);
    }

  
    @Override
    public ApiResponse<LogsheetDTO> getLogsheetById(Long id) {
        Logsheet entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logsheet not found with id: " + id));
        return new ApiResponse<>("Logsheet found", true, mapEntityToDto(entity));
    }

   
    @Override
    public ApiResponse<LogsheetDTO> updateLogsheet(Long id, LogsheetUpdateDTO dto) {
        Logsheet existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logsheet not found with id: " + id));

        
        if (dto.getEntryType() != null) {
            existing.setEntryType(Logsheet.EntryType.valueOf(dto.getEntryType())); 
        }
        if (dto.getDescription() != null) {
            existing.setDescription(dto.getDescription());
        }
        if (dto.getTopicId() != null) {
            existing.setTopic(topicRepository.findById(dto.getTopicId())
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + dto.getTopicId())));
        } else {
            existing.setTopic(null);
        }
        
        if (dto.getGroupId() != null) {
            existing.setGroup(groupRepository.findById(dto.getGroupId())
                    .orElseThrow(() -> new ResourceNotFoundException("Group not found with id: " + dto.getGroupId())));
        }

        Logsheet updated = repository.save(existing);
        return new ApiResponse<>("Logsheet updated successfully", true, mapEntityToDto(updated));
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
        return new ApiResponse<>("Logsheet verification updated", true, mapEntityToDto(updated));
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
        return new ApiResponse<>("Logsheet approval updated", true, mapEntityToDto(updated));
    }

    private Logsheet mapCreateDtoToEntity(LogsheetCreateDTO dto) {
        Logsheet entity = new Logsheet();
        if (dto.getEntryType() != null) {
            entity.setEntryType(Logsheet.EntryType.valueOf(dto.getEntryType()));
        }
        entity.setLogDate(LocalDateTime.now());
        entity.setDescription(dto.getDescription());

        entity.setStaff(staffRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + dto.getStaffId())));
        entity.setCourse(courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + dto.getCourseId())));
        entity.setModule(moduleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + dto.getModuleId())));
        if (dto.getTopicId() != null) {
            entity.setTopic(topicRepository.findById(dto.getTopicId())
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + dto.getTopicId())));
        }
        entity.setLogsheetType(logsheetTypeRepository.findById(dto.getLogsheetTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("LogsheetType not found with id: " + dto.getLogsheetTypeId())));
        if (dto.getGroupId() != null) {
            entity.setGroup(groupRepository.findById(dto.getGroupId())
                    .orElseThrow(() -> new ResourceNotFoundException("Group not found with id: " + dto.getGroupId())));
        }
        return entity;
    }


    private LogsheetDTO mapEntityToDto(Logsheet entity) {
        LogsheetDTO dto = mapper.map(entity, LogsheetDTO.class);

        dto.setStaffId(entity.getStaff() != null ? entity.getStaff().getId() : null);
        dto.setCourseId(entity.getCourse() != null ? entity.getCourse().getId() : null);
        dto.setModuleId(entity.getModule() != null ? entity.getModule().getId() : null);
        dto.setTopicId(entity.getTopic() != null ? entity.getTopic().getId() : null);
        dto.setLogsheetTypeId(entity.getLogsheetType() != null ? entity.getLogsheetType().getId() : null);
        dto.setGroupId(entity.getGroup() != null ? entity.getGroup().getId() : null);
        dto.setVerifiedById(entity.getVerifiedBy() != null ? entity.getVerifiedBy().getId() : null);
        dto.setApprovedById(entity.getApprovedBy() != null ? entity.getApprovedBy().getId() : null);

        return dto;
    }
}
