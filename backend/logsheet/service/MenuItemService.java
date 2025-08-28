package com.sunbeam.logsheet.service;

import java.util.List;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.MenuItemRequestDTO;
import com.sunbeam.logsheet.DTO.MenuItemResponseDTO;

public interface MenuItemService {

    ApiResponse<?> createMenuItem(MenuItemRequestDTO dto);

    ApiResponse<?> updateMenuItem(Long id, MenuItemRequestDTO dto);

    ApiResponse<?> deleteMenuItem(Long id);

    List<MenuItemResponseDTO> getAllMenuItems();

    MenuItemResponseDTO getMenuItemById(Long id);
}
