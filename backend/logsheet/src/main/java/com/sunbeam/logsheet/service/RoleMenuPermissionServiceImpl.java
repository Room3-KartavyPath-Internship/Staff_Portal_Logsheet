package com.sunbeam.logsheet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.RoleMenuPermissionDTO;
import com.sunbeam.logsheet.entity.RoleMenuId;
import com.sunbeam.logsheet.entity.RoleMenuPermission;
import com.sunbeam.logsheet.repository.MenuItemRepository;
import com.sunbeam.logsheet.repository.RoleMenuPermissionRepository;
import com.sunbeam.logsheet.repository.RoleRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class RoleMenuPermissionServiceImpl implements RoleMenuPermissionService {

    @Autowired
    private RoleMenuPermissionRepository permissionRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private MenuItemRepository menuRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ApiResponse<?> createPermission(RoleMenuPermissionDTO dto) {
        // Validate Role
        roleRepo.findById(dto.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));

        // Validate MenuItem
        menuRepo.findById(dto.getMenuItemId())
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found"));

        RoleMenuPermission permission = new RoleMenuPermission();
        RoleMenuId id = new RoleMenuId(dto.getRoleId(), dto.getMenuItemId());
        permission.setId(id);
        permission.setAllowed(dto.isAllowed());
        permission.setRole(roleRepo.getReferenceById(dto.getRoleId()));
        permission.setMenuItem(menuRepo.getReferenceById(dto.getMenuItemId()));

        permissionRepo.save(permission);
        return new ApiResponse<>("Role menu permission created successfully", true,
                modelMapper.map(permission, RoleMenuPermissionDTO.class));
    }

    @Override
    public RoleMenuPermissionDTO getPermission(RoleMenuId id) {
        RoleMenuPermission permission = permissionRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Permission not found"));
        return modelMapper.map(permission, RoleMenuPermissionDTO.class);
    }

    @Override
    public List<RoleMenuPermissionDTO> getAllPermissions() {
        return permissionRepo.findAll()
                .stream()
                .map(p -> modelMapper.map(p, RoleMenuPermissionDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResponse<?> updatePermission(RoleMenuId id, boolean allowed) {
        RoleMenuPermission permission = permissionRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Permission not found"));

        permission.setAllowed(allowed);
        permissionRepo.save(permission);

        return new ApiResponse<>("Permission updated successfully", true,
                modelMapper.map(permission, RoleMenuPermissionDTO.class));
    }

    @Override
    public ApiResponse<?> deletePermission(RoleMenuId id) {
        RoleMenuPermission permission = permissionRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Permission not found"));

        permissionRepo.delete(permission);

        return new ApiResponse<>("Permission deleted successfully", true, id);
    }
}
