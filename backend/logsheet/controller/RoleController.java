package com.sunbeam.logsheet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.RoleCreateDTO;
import com.sunbeam.logsheet.DTO.RoleUpdateDTO;
import com.sunbeam.logsheet.DTO.RoleResponseDTO;
import com.sunbeam.logsheet.service.RoleService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createRole(@RequestBody RoleCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(roleService.createRole(dto));
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
    public ResponseEntity<ApiResponse<?>> getRoleById(@PathVariable Long id) {
        RoleResponseDTO role = roleService.getRoleById(id);
        return ResponseEntity.ok(new ApiResponse<>("Role details", true, role));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllRoles() {
        List<RoleResponseDTO> roles = roleService.getAllRoles();
        return ResponseEntity.ok(new ApiResponse<>("All roles", true, roles));
    }
}
