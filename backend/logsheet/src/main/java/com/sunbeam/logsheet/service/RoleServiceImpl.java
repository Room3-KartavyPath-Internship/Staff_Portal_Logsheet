package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.entity.*;
import com.sunbeam.logsheet.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ApiResponse<?> createRole(RoleCreateDTO dto) {
        if (dto.getTitle() == null || dto.getTitle().isEmpty()) {
            return new ApiResponse<>("Role title cannot be empty", false, null);
        }

        
        Role role = new Role();
        role.setTitle(dto.getTitle());
        role.setDescription(dto.getDescription());
        Role savedRole = roleRepository.save(role); 

        
        if (dto.getMenuPermissions() != null) {
            for (RoleMenuPermissionDTO mpDto : dto.getMenuPermissions()) {
                if (mpDto.getMenuItemId() == null) continue; 

                MenuItem menuItem = menuItemRepository.findById(mpDto.getMenuItemId())
                        .orElseThrow(() -> new EntityNotFoundException("Menu item not found: " + mpDto.getMenuItemId()));

                RoleMenuPermission perm = new RoleMenuPermission();
                perm.setId(new RoleMenuId(savedRole.getId(), menuItem.getId()));
                perm.setRole(savedRole);
                perm.setMenuItem(menuItem);
                perm.setAllowed(mpDto.isAllowed());

                savedRole.getMenuPermissions().add(perm);
            }
        }

        savedRole = roleRepository.save(savedRole);

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
        if (id == null) throw new IllegalArgumentException("Role ID cannot be null");

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Role not found: " + id));

        role.setTitle(dto.getTitle());
        role.setDescription(dto.getDescription());
        role.getMenuPermissions().clear();

        if (dto.getMenuPermissions() != null) {
            for (RoleMenuPermissionDTO mpDto : dto.getMenuPermissions()) {
                if (mpDto.getMenuItemId() == null) continue;

                MenuItem menuItem = menuItemRepository.findById(mpDto.getMenuItemId())
                        .orElseThrow(() -> new EntityNotFoundException("Menu item not found: " + mpDto.getMenuItemId()));

                RoleMenuPermission perm = new RoleMenuPermission();
                perm.setId(new RoleMenuId(role.getId(), menuItem.getId()));
                perm.setRole(role);
                perm.setMenuItem(menuItem);
                perm.setAllowed(mpDto.isAllowed());

                role.getMenuPermissions().add(perm);
            }
        }

        roleRepository.save(role);

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

    @Override
    public ApiResponse<?> deleteRole(Long id) {
        if (id == null) throw new IllegalArgumentException("Role ID cannot be null");

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Role not found: " + id));
        roleRepository.delete(role);
        return new ApiResponse<>("Role deleted successfully", true, id);
    }

    @Override
    public RoleResponseDTO getRoleById(Long id) {
        if (id == null) throw new IllegalArgumentException("Role ID cannot be null");

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Role not found: " + id));

        RoleResponseDTO dto = modelMapper.map(role, RoleResponseDTO.class);
        dto.setMenuPermissions(role.getMenuPermissions().stream().map(p -> {
            RoleMenuPermissionDTO permDTO = new RoleMenuPermissionDTO();
            permDTO.setRoleId(p.getRole().getId());
            permDTO.setMenuItemId(p.getMenuItem().getId());
            permDTO.setAllowed(p.isAllowed());
            return permDTO;
        }).collect(Collectors.toList()));

        return dto;
    }

    @Override
    public List<RoleResponseDTO> getAllRoles() {
        return roleRepository.findAll().stream().map(role -> {
            RoleResponseDTO dto = modelMapper.map(role, RoleResponseDTO.class);
            dto.setMenuPermissions(role.getMenuPermissions().stream().map(p -> {
                RoleMenuPermissionDTO permDTO = new RoleMenuPermissionDTO();
                permDTO.setRoleId(p.getRole().getId());
                permDTO.setMenuItemId(p.getMenuItem().getId());
                permDTO.setAllowed(p.isAllowed());
                return permDTO;
            }).collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<RoleResponseDTO> getRolesByTitleDTO(String title) {
        if (title == null) throw new IllegalArgumentException("Role title cannot be null");

        return roleRepository.findByTitle(title).stream().map(role -> {
            RoleResponseDTO dto = modelMapper.map(role, RoleResponseDTO.class);
            dto.setMenuPermissions(role.getMenuPermissions().stream().map(p -> {
                RoleMenuPermissionDTO permDTO = new RoleMenuPermissionDTO();
                permDTO.setRoleId(p.getRole().getId());
                permDTO.setMenuItemId(p.getMenuItem().getId());
                permDTO.setAllowed(p.isAllowed());
                return permDTO;
            }).collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }
}
