package com.sunbeam.logsheet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.RoleCreateDTO;
import com.sunbeam.logsheet.DTO.RoleMenuPermissionDTO;
import com.sunbeam.logsheet.DTO.RoleResponseDTO;
import com.sunbeam.logsheet.DTO.RoleUpdateDTO;
import com.sunbeam.logsheet.entity.Role;
import com.sunbeam.logsheet.entity.RoleMenuPermission;
import com.sunbeam.logsheet.entity.RoleMenuId;
import com.sunbeam.logsheet.repository.MenuItemRepository;
import com.sunbeam.logsheet.repository.RoleMenuPermissionRepository;
import com.sunbeam.logsheet.repository.RoleRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private RoleMenuPermissionRepository permissionRepository;

    @Autowired
    private ModelMapper modelMapper;

    
    @Override
    public ApiResponse<?> createRole(RoleCreateDTO dto) {
        Role role = new Role();
        role.setTitle(dto.getTitle());
        role.setDescription(dto.getDescription());

        Role savedRole = roleRepository.save(role);

        List<RoleMenuPermission> permissions = dto.getMenuPermissions().stream().map(p -> {
            RoleMenuPermission perm = new RoleMenuPermission();

            var menuItem = menuItemRepository.findById(p.getMenuItemId())
                    .orElseThrow(() -> new EntityNotFoundException("Menu item not found"));

            RoleMenuId idKey = new RoleMenuId(savedRole.getId(), menuItem.getId());
            perm.setId(idKey);
            perm.setRole(savedRole);
            perm.setMenuItem(menuItem);
            perm.setAllowed(p.isAllowed());
            return perm;
        }).collect(Collectors.toList());

        savedRole.setMenuPermissions(permissions);
        roleRepository.save(savedRole);

        // Manual mapping for response to include roleId & menuItemId
        RoleResponseDTO responseDTO = modelMapper.map(savedRole, RoleResponseDTO.class);
        responseDTO.setMenuPermissions(savedRole.getMenuPermissions().stream().map(p -> {
            RoleMenuPermissionDTO permDTO = new RoleMenuPermissionDTO();
            permDTO.setRoleId(p.getRole().getId());
            permDTO.setMenuItemId(p.getMenuItem().getId());
            permDTO.setAllowed(p.isAllowed());
            return permDTO;
        }).collect(Collectors.toList()));

        return new ApiResponse<>("Role created successfully", true, responseDTO);
    }

    @Override
    public ApiResponse<?> updateRole(Long id, RoleUpdateDTO dto) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));

        role.setTitle(dto.getTitle());
        role.setDescription(dto.getDescription());

        // Clear existing permissions
        role.getMenuPermissions().clear();

        // Map new permissions
        role.getMenuPermissions().addAll(
                dto.getMenuPermissions().stream().map(p -> {
                    RoleMenuPermission perm = new RoleMenuPermission();

                    var menuItem = menuItemRepository.findById(p.getMenuItemId())
                            .orElseThrow(() -> new EntityNotFoundException("Menu item not found"));

                    RoleMenuId idKey = new RoleMenuId(role.getId(), menuItem.getId());
                    perm.setId(idKey);
                    perm.setRole(role);
                    perm.setMenuItem(menuItem);
                    perm.setAllowed(p.isAllowed());

                    return perm;
                }).collect(Collectors.toList())
        );

        roleRepository.save(role);

        // Map manually to include IDs
        RoleResponseDTO responseDTO = modelMapper.map(role, RoleResponseDTO.class);
        responseDTO.setMenuPermissions(role.getMenuPermissions().stream().map(p -> {
            RoleMenuPermissionDTO permDTO = new RoleMenuPermissionDTO();
            permDTO.setRoleId(p.getRole().getId());
            permDTO.setMenuItemId(p.getMenuItem().getId());
            permDTO.setAllowed(p.isAllowed());
            return permDTO;
        }).collect(Collectors.toList()));

        return new ApiResponse<>("Role updated successfully", true, responseDTO);
    }


    // ---------------- DELETE ROLE ----------------
    @Override
    public ApiResponse<?> deleteRole(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));
        roleRepository.delete(role);
        return new ApiResponse<>("Role deleted successfully", true, id);
    }

 
    
    @Override
    public RoleResponseDTO getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));

        RoleResponseDTO dto = modelMapper.map(role, RoleResponseDTO.class);

        // Manually map menuPermissions to include IDs
        dto.setMenuPermissions(role.getMenuPermissions().stream().map(p -> {
            RoleMenuPermissionDTO permDTO = new RoleMenuPermissionDTO();
            permDTO.setRoleId(p.getRole().getId());         // set roleId
            permDTO.setMenuItemId(p.getMenuItem().getId()); // set menuItemId
            permDTO.setAllowed(p.isAllowed());
            return permDTO;
        }).collect(Collectors.toList()));

        return dto;
    }



    
    @Override
    public List<RoleResponseDTO> getAllRoles() {
        return roleRepository.findAll()
            .stream()
            .map(role -> {
                RoleResponseDTO dto = modelMapper.map(role, RoleResponseDTO.class);

                // Map menu permissions manually
                dto.setMenuPermissions(role.getMenuPermissions().stream().map(p -> {
                    RoleMenuPermissionDTO permDTO = new RoleMenuPermissionDTO();
                    permDTO.setRoleId(p.getRole().getId());         // set roleId
                    permDTO.setMenuItemId(p.getMenuItem().getId()); // set menuItemId
                    permDTO.setAllowed(p.isAllowed());
                    return permDTO;
                }).collect(Collectors.toList()));

                return dto;
            })
            .collect(Collectors.toList());
    }

}
