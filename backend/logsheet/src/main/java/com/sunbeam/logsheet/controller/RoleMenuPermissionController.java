package com.sunbeam.logsheet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.RoleMenuPermissionDTO;
import com.sunbeam.logsheet.entity.RoleMenuId;
import com.sunbeam.logsheet.service.RoleMenuPermissionService;

@RestController
@RequestMapping("/api/role-menu-permissions")
public class RoleMenuPermissionController {

    @Autowired
    private RoleMenuPermissionService service;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createPermission(@RequestBody RoleMenuPermissionDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createPermission(dto));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllPermissions() {
        List<RoleMenuPermissionDTO> list = service.getAllPermissions();
        return ResponseEntity.ok(new ApiResponse<>("All permissions retrieved", true, list));
    }

    @GetMapping("/{roleId}/{menuItemId}")
    public ResponseEntity<ApiResponse<?>> getPermission(@PathVariable Long roleId,
                                                        @PathVariable Long menuItemId) {
        RoleMenuId id = new RoleMenuId(roleId, menuItemId);
        return ResponseEntity.ok(new ApiResponse<>("Permission details", true, service.getPermission(id)));
    }

    @PutMapping("/{roleId}/{menuItemId}")
    public ResponseEntity<ApiResponse<?>> updatePermission(@PathVariable Long roleId,
                                                           @PathVariable Long menuItemId,
                                                           @RequestParam boolean allowed) {
        RoleMenuId id = new RoleMenuId(roleId, menuItemId);
        return ResponseEntity.ok(service.updatePermission(id, allowed));
    }

    @DeleteMapping("/{roleId}/{menuItemId}")
    public ResponseEntity<ApiResponse<?>> deletePermission(@PathVariable Long roleId,
                                                           @PathVariable Long menuItemId) {
        RoleMenuId id = new RoleMenuId(roleId, menuItemId);
        return ResponseEntity.ok(service.deletePermission(id));
    }
}
