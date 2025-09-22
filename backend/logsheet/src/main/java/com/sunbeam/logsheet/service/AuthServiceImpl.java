package com.sunbeam.logsheet.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.entity.MenuItem;
import com.sunbeam.logsheet.entity.Role;
import com.sunbeam.logsheet.entity.Staff;
import com.sunbeam.logsheet.entity.StaffType;
import com.sunbeam.logsheet.repository.MenuItemRepository;
import com.sunbeam.logsheet.repository.RoleRepository;
import com.sunbeam.logsheet.repository.StaffRepository;

import jakarta.transaction.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    // constant to block Admin registration
    private static final String ADMIN_ROLE = "Admin";

    // ✅ LOGIN with allowed menus
    @Override
    public LoginResponse login(LoginRequest request) {
        Staff staff = staffRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!staff.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        Role role = staff.getRole();

        // Fetch allowed menus based on role
        List<MenuItem> allowedMenus = menuItemRepository.findAllowedMenusByRoleId(role.getId());

        return new LoginResponse(
                staff.getId(),
                staff.getFirstName() + " " + staff.getLastName(), // ✅ fullName
                role.getTitle(),
                allowedMenus
        );
    }


    // ✅ REGISTER (only CoCo & Staff, not Admin)
    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        // 1. Block Admin registration
        if ("Admin".equalsIgnoreCase(request.getRole())) {
            throw new RuntimeException("Admin cannot register. Please use admin login.");
        }

        // 2. Check duplicate email
        if (staffRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered: " + request.getEmail());
        }

        // 3. Find role (case-insensitive)
        Role role = roleRepository.findAll().stream()
                .filter(r -> r.getTitle().equalsIgnoreCase(request.getRole()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Invalid role: " + request.getRole()));

        // 4. StaffType (default = InHouse)
        StaffType staffType = request.getStaff_type() != null ? request.getStaff_type() : StaffType.InHouse;

        // 5. Create Staff
        Staff staff = new Staff();
        staff.setFirstName(request.getFirstName());
        staff.setLastName(request.getLastName());
        staff.setEmail(request.getEmail());
        staff.setPassword(request.getPassword()); // TODO: hash later
        staff.setMobile(request.getMobile());
        staff.setRole(role);
        staff.setStaffType(staffType);

        // 6. Save
        Staff saved = staffRepository.save(staff);

        // 7. Return response (using fullName)
        return new RegisterResponse(
                saved.getId(),
                saved.getFirstName() + " " + saved.getLastName(),
                saved.getEmail(),
                saved.getRole().getTitle(),
                saved.getStaffType(),
                "User registered successfully"
        );
    }


    // ✅ SEND RESET LINK
    @Override
    @Transactional
    public String sendResetLink(String email) {
        Staff staff = staffRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        String token = UUID.randomUUID().toString();
        staff.setResetToken(token);
        staff.setResetTokenExpiry(LocalDateTime.now().plusMinutes(30));
        staffRepository.save(staff);

        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        System.out.println("Reset link: " + resetLink); // TODO: replace with actual email sending

        return "Password reset link sent! Check console for link.";
    }

    // ✅ RESET PASSWORD
    @Override
    @Transactional
    public String resetPassword(String token, String newPassword) {
        Staff staff = staffRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        if (staff.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }

        staff.setPassword(newPassword); // TODO: hash password
        staff.setResetToken(null);
        staff.setResetTokenExpiry(null);
        staffRepository.save(staff);

        return "Password updated successfully!";
    }
}
