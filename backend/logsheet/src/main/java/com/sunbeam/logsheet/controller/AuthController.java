
package com.sunbeam.logsheet.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.entity.MenuItem;
import com.sunbeam.logsheet.entity.Role;
import com.sunbeam.logsheet.entity.Staff;
import com.sunbeam.logsheet.repository.MenuItemRepository;
import com.sunbeam.logsheet.repository.StaffRepository;
import com.sunbeam.logsheet.service.AuthService;

@RestController
@RequestMapping("/auth")


public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired private StaffRepository staffRepository;
    @Autowired private MenuItemRepository menuItemRepository;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Staff staff = staffRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        Role role = staff.getRole();
        List<MenuItem> allowedMenus = menuItemRepository.findAllowedMenusByRoleId(role.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("id", staff.getId());
        response.put("name", staff.getFirstName() + " " + staff.getLastName());
        response.put("role", role.getTitle());
        response.put("menus", allowedMenus);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
        if(request.getEmail().equals("admin@system.com") && request.getPassword().equals("admin123")) {
            List<MenuItem> allMenus = menuItemRepository.findAll();

            Map<String, Object> response = new HashMap<>();
            response.put("id", 0);
            response.put("name", "System Admin");
            response.put("role", "Admin");
            response.put("menus", allMenus);

            return ResponseEntity.ok(response);
        }
        throw new RuntimeException("Invalid admin credentials");
    }

    // ✅ Register
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
        RegisterResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(response);
    }


    
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String response = authService.sendResetLink(email);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String newPassword = body.get("newPassword");
        String response = authService.resetPassword(token, newPassword);
        return ResponseEntity.ok(response);
    }

}
