package com.sunbeam.logsheet.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import jakarta.persistence.EntityNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.MenuItemRequestDTO;
import com.sunbeam.logsheet.DTO.MenuItemResponseDTO;
import com.sunbeam.logsheet.entity.MenuItem;
import com.sunbeam.logsheet.repository.MenuItemRepository;

@Transactional
@Service
public class MenuItemServiceImpl implements MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ApiResponse<?> createMenuItem(MenuItemRequestDTO dto) {
        MenuItem item = modelMapper.map(dto, MenuItem.class);
        menuItemRepository.save(item);
        return new ApiResponse<>("Menu item created successfully", true);
    }

    @Override
    public List<MenuItemResponseDTO> getAllMenuItems() {
        return menuItemRepository.findAll()
                .stream()
                .map(item -> modelMapper.map(item, MenuItemResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemResponseDTO getMenuItemById(Long id) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found with ID: " + id));
        return modelMapper.map(item, MenuItemResponseDTO.class);
    }

    @Override
    public ApiResponse<?> updateMenuItem(Long id, MenuItemRequestDTO dto) {
        MenuItem existing = menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found with ID: " + id));

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setPath(dto.getPath());

        menuItemRepository.save(existing);
        return new ApiResponse<>("Menu item updated successfully", true);
    }

    @Override
    public ApiResponse<?> deleteMenuItem(Long id) {
        MenuItem existing = menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found with ID: " + id));

        menuItemRepository.delete(existing);
        return new ApiResponse<>("Menu item deleted successfully", true);
    }
}
