package com.sunbeam.logsheet.service;

import java.util.List;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.RoleCreateDTO;
import com.sunbeam.logsheet.DTO.RoleResponseDTO;
import com.sunbeam.logsheet.DTO.RoleUpdateDTO;


public interface RoleService {

	 ApiResponse<?> createRole(RoleCreateDTO dto);

	    ApiResponse<?> updateRole(Long id, RoleUpdateDTO dto);

	    ApiResponse<?> deleteRole(Long id);

	    RoleResponseDTO getRoleById(Long id);

	    List<RoleResponseDTO> getAllRoles();
}
