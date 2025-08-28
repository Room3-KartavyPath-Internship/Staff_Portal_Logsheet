package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.GroupRequestDTO;
import com.sunbeam.logsheet.DTO.GroupResponseDTO;

import java.util.List;

public interface GroupMasterService {
    ApiResponse<?> addGroup(GroupRequestDTO dto);
    ApiResponse<?> updateGroup(Long id, GroupRequestDTO dto);
    ApiResponse<?> deleteGroup(Long id);
    List<GroupResponseDTO> getAllGroups();
}
