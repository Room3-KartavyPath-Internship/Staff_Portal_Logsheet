package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.*;

import java.util.List;

public interface RoleService {
    ApiResponse<?> createRole(RoleCreateDTO dto);
    ApiResponse<?> updateRole(Long id, RoleUpdateDTO dto);
    ApiResponse<?> deleteRole(Long id);
    RoleResponseDTO getRoleById(Long id);
    List<RoleResponseDTO> getAllRoles();
    List<RoleResponseDTO> getRolesByTitleDTO(String title);
}
