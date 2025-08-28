package com.sunbeam.logsheet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.MenuItemRequestDTO;
import com.sunbeam.logsheet.DTO.MenuItemResponseDTO;
import com.sunbeam.logsheet.service.MenuItemService;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createMenuItem(@RequestBody MenuItemRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(menuItemService.createMenuItem(dto));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllMenuItems() {
        List<MenuItemResponseDTO> list = menuItemService.getAllMenuItems();
        return ResponseEntity.ok(new ApiResponse<>("All menu items retrieved", true, list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getMenuItemById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>("Menu item details", true, menuItemService.getMenuItemById(id))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateMenuItem(@PathVariable Long id, @RequestBody MenuItemRequestDTO dto) {
        return ResponseEntity.ok(menuItemService.updateMenuItem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteMenuItem(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemService.deleteMenuItem(id));
    }
}
