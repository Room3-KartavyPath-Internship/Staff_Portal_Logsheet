package com.sunbeam.logsheet.controller;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.GroupRequestDTO;
import com.sunbeam.logsheet.DTO.GroupResponseDTO;
import com.sunbeam.logsheet.service.GroupMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupMasterController {

    @Autowired
    private GroupMasterService groupMasterService;

    @PostMapping
    public ResponseEntity<ApiResponse> addGroup(@RequestBody GroupRequestDTO dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(groupMasterService.addGroup(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateGroup(@PathVariable Long id, @RequestBody GroupRequestDTO dto) {
        return ResponseEntity.ok(groupMasterService.updateGroup(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteGroup(@PathVariable Long id) {
        ApiResponse response = groupMasterService.deleteGroup(id);
        if (!response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GroupResponseDTO>> getAllGroups() {
        return ResponseEntity.ok(groupMasterService.getAllGroups());
    }
}
