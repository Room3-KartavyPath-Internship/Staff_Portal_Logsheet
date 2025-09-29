
package com.sunbeam.logsheet.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.logsheet.entity.MenuItem;
import com.sunbeam.logsheet.entity.Role;
import com.sunbeam.logsheet.entity.Staff;
import com.sunbeam.logsheet.entity.StaffType;
import com.sunbeam.logsheet.repository.MenuItemRepository;
import com.sunbeam.logsheet.repository.RoleRepository;
import com.sunbeam.logsheet.repository.StaffRepository;
import com.sunbeam.logsheet.security.JwtUtil;
import com.sunbeam.logsheet.service.AuthService;

@RestController
@RequestMapping("/auth")


public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private MenuItemRepository menuItemRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private RoleRepository roleRepository;
    
    
    private final String ADMIN_EMAIL = "admin@system.com";
    private final String ADMIN_PASSWORD = "admin123";



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
    	
    	

    	
        Staff staff = staffRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid credentials"));

        if (!passwordEncoder.matches(req.getPassword(), staff.getPassword())) {
            throw new ResourceNotFoundException("Invalid credentials");
        }
        
        


        String token = jwtUtil.generateToken(staff.getEmail());

 
        Role role = staff.getRole();
        List<MenuItem> allowedMenus = menuItemRepository.findAllowedMenusByRoleId(role.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("id", staff.getId());
        response.put("name", staff.getFirstName() + " " + staff.getLastName());
        response.put("role", role.getTitle());
        response.put("menus", allowedMenus);

        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {

        
        Staff admin = staffRepository.findByEmail(ADMIN_EMAIL).orElse(null);
        if (admin == null) {
            
            Role adminRole = roleRepository.findByTitle("Role_Admin")
                    .orElseGet(() -> {
                        Role role = new Role();
                        role.setTitle("Role_Admin");
                        role.setDescription("System Administrator");
                        return roleRepository.save(role);
                    });

        
            admin = new Staff();
            admin.setFirstName("System");
            admin.setLastName("Admin");
            admin.setEmail(ADMIN_EMAIL);
            admin.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));
            admin.setMobile("0000000000");
            admin.setRole(adminRole);
            admin.setStaffType(StaffType.InHouse); 
            staffRepository.save(admin);
        }

      
        if (!request.getEmail().equals(ADMIN_EMAIL) || 
            !passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid admin credentials");
        }

        
        String token = jwtUtil.generateToken(admin.getEmail());
        List<MenuItem> allMenus = menuItemRepository.findAll();

        
        Map<String, Object> response = new HashMap<>();
        response.put("id", admin.getId());
        response.put("name", admin.getFirstName() + " " + admin.getLastName());
        response.put("role", "Admin");
        response.put("menus", allMenus);
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

  
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
