package com.sunbeam.logsheet.controller;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.entity.User;
import com.sunbeam.logsheet.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createRole(@RequestBody RoleCreateDTO dto) {
        return ResponseEntity.ok(roleService.createRole(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateRole(@PathVariable Long id, @RequestBody RoleUpdateDTO dto) {
        return ResponseEntity.ok(roleService.updateRole(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteRole(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.deleteRole(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoleResponseDTO>> getRoleById(@PathVariable Long id) {
        RoleResponseDTO role = roleService.getRoleById(id);
        return ResponseEntity.ok(new ApiResponse<>("Role details", true, role));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleResponseDTO>>> getAllRoles() {
        List<RoleResponseDTO> roles = roleService.getAllRoles();
        return ResponseEntity.ok(new ApiResponse<>("All roles", true, roles));
    }


    @GetMapping("/for-user")
    public ResponseEntity<ApiResponse<List<RoleResponseDTO>>> getRolesForUser(
            @RequestAttribute("user") User user 
    ) {
        List<RoleResponseDTO> roles;

        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            roles = roleService.getAllRoles();
        } else {
            roles = roleService.getRolesByTitleDTO(user.getRole());
        }

        return ResponseEntity.ok(new ApiResponse<>("Roles fetched", true, roles));
    }
}
