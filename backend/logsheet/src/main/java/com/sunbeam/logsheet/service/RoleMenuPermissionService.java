package com.sunbeam.logsheet.service;

import java.util.List;


import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.RoleMenuPermissionDTO;
import com.sunbeam.logsheet.entity.RoleMenuId;


public interface RoleMenuPermissionService {
	 ApiResponse<?> createPermission(RoleMenuPermissionDTO dto);

	    ApiResponse<?> updatePermission(RoleMenuId id, boolean allowed);

	    ApiResponse<?> deletePermission(RoleMenuId id);

	    RoleMenuPermissionDTO getPermission(RoleMenuId id);

	    List<RoleMenuPermissionDTO> getAllPermissions();
}
