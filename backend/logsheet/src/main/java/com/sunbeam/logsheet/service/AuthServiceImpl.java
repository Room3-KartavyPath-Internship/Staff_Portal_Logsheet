//
//package com.sunbeam.logsheet.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.sunbeam.logsheet.DTO.ForgotPasswordRequest;
//import com.sunbeam.logsheet.DTO.LoginRequest;
//import com.sunbeam.logsheet.DTO.LoginResponse;
//import com.sunbeam.logsheet.DTO.RegisterRequest;
//import com.sunbeam.logsheet.DTO.RegisterResponse;
//import com.sunbeam.logsheet.entity.Role;
//import com.sunbeam.logsheet.entity.Staff;
//import com.sunbeam.logsheet.entity.StaffType;
//import com.sunbeam.logsheet.repository.RoleRepository;
//import com.sunbeam.logsheet.repository.StaffRepository;
//
//import jakarta.transaction.Transactional;
//
//
//@Service
//public class AuthServiceImpl implements AuthService {
//
//    @Autowired
//    private StaffRepository staffRepository;
//    
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Override
//    public LoginResponse login(LoginRequest request) {
//        Staff staff = staffRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
//
//        if (!staff.getPassword().equals(request.getPassword())) {
//            throw new RuntimeException("Invalid email or password");
//        }
//
//        return new LoginResponse(
//              staff.getId(),
//              staff.getFirstName() + " " + staff.getLastName(),
//              staff.getRole().getTitle()
//      );
//    }
////    
////    @Override
////    public RegisterResponse register(RegisterRequest request) {
////        Role role = roleRepository.findByTitle(request.getRole())
////                .orElseThrow(() -> new RuntimeException("Invalid role: " + request.getRole()));
////
////        StaffType staffType = StaffType.valueOf(
////                request.getStaff_type() != null ? request.getStaff_type);
////        );
////
////        Staff staff = new Staff();
////        staff.setFirstName(request.getFirstName());
////        staff.setLastName(request.getLastName());
////        staff.setEmail(request.getEmail());
////        staff.setPassword(request.getPassword()); // plain password
////        staff.setMobile(request.getMobile());
////        staff.setRole(role);
////        staff.setStaffType(staffType);
////
////        Staff saved = staffRepository.save(staff);
////
////        return new RegisterResponse(
////                saved.getId(),
////                saved.getFirstName() + " " + saved.getLastName(),
////                saved.getEmail(),
////                saved.getRole().getTitle(),
////                saved.getStaffType().toString(),
////                "User registered successfully"
////        );
////    }
//    
//    
////    @Override
////    @Transactional
////    public RegisterResponse register(RegisterRequest request) {
////
////        // 1. Check duplicate email
////        if (staffRepository.existsByEmail(request.getEmail())) {
////            throw new RuntimeException("Email already registered: " + request.getEmail());
////        }
////
////        // 2. Find role
////        Role role = roleRepository.findByTitle(request.getRole())
////                .orElseThrow(() -> new RuntimeException("Invalid role: " + request.getRole()));
////
////        // 3. StaffType (default = InHouse)
////        StaffType staffType = request.getStaff_type() != null ? request.getStaff_type() : StaffType.InHouse;
////
////        // 4. Create Staff
////        Staff staff = new Staff();
////        staff.setFirstName(request.getFirstName());
////        staff.setLastName(request.getLastName());
////        staff.setEmail(request.getEmail());
////        staff.setPassword(request.getPassword()); // plain text for now
////        staff.setMobile(request.getMobile());
////        staff.setRole(role);
////        staff.setStaffType(staffType);
////
////        // 5. Save
////        Staff saved = staffRepository.save(staff);
////
////        // 6. Return response
////        return new RegisterResponse(
////                saved.getId(),
////                saved.getFirstName() + " " + saved.getLastName(),
////                saved.getEmail(),
////                saved.getRole().getTitle(),
////                saved.getStaffType(),
////                "User registered successfully"
////        );
////    }
//
//    @Override
//    @Transactional
//    public RegisterResponse register(RegisterRequest request) {
//
//        // 1. Check duplicate email
//        if (staffRepository.existsByEmail(request.getEmail())) {
//            throw new RuntimeException("Email already registered: " + request.getEmail());
//        }
//
//        // 2. Find role (case-insensitive)
//        Role role = roleRepository.findAll().stream()
//                .filter(r -> r.getTitle().equalsIgnoreCase(request.getRole()))
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("Invalid role: " + request.getRole()));
//
//        // 3. StaffType (default = InHouse)
//        StaffType staffType;
//        if (request.getStaff_type() != null) {
//            try {
//                staffType = StaffType.valueOf(request.getStaff_type().toString().toUpperCase());
//            } catch (IllegalArgumentException e) {
//                throw new RuntimeException("Invalid staff type: " + request.getStaff_type());
//            }
//        } else {
//            staffType = StaffType.InHouse; // default
//        }
//
//        // 4. Create Staff
//        Staff staff = new Staff();
//        staff.setFirstName(request.getFirstName());
//        staff.setLastName(request.getLastName());
//        staff.setEmail(request.getEmail());
//        staff.setPassword(request.getPassword()); // TODO: hash this later
//        staff.setMobile(request.getMobile());
//        staff.setRole(role);
//        staff.setStaffType(staffType);
//
//        // 5. Save
//        Staff saved = staffRepository.save(staff);
//
//        // 6. Return response
//        return new RegisterResponse(
//                saved.getId(),
//                saved.getFirstName() + " " + saved.getLastName(),
//                saved.getEmail(),
//                saved.getRole().getTitle(),
//                saved.getStaffType(),
//                "User registered successfully"
//        );
//    }
//
//
//
//    // ---------------- Forgot Password ----------------
//    @Override
//    public String forgotPassword(ForgotPasswordRequest request) {
//        Staff staff = staffRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));
//
//        // Update password with new one (plain text)
//        staff.setPassword(request.getNewPassword());
//        staffRepository.save(staff);
//
//        return "Password updated successfully for email: " + request.getEmail();
//    }
//
//}
//

package com.sunbeam.logsheet.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.entity.Role;
import com.sunbeam.logsheet.entity.Staff;
import com.sunbeam.logsheet.entity.StaffType;
import com.sunbeam.logsheet.repository.RoleRepository;
import com.sunbeam.logsheet.repository.StaffRepository;

import jakarta.transaction.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private StaffRepository staffRepository;
    
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public LoginResponse login(LoginRequest request) {
        Staff staff = staffRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!staff.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return new LoginResponse(
              staff.getId(),
              staff.getFirstName() + " " + staff.getLastName(),
              staff.getRole().getTitle()
      );
    }

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        // 1. Check duplicate email
        if (staffRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered: " + request.getEmail());
        }

        // 2. Find role (case-insensitive)
        Role role = roleRepository.findAll().stream()
                .filter(r -> r.getTitle().equalsIgnoreCase(request.getRole()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Invalid role: " + request.getRole()));

        // 3. StaffType (default = InHouse)
        StaffType staffType = request.getStaff_type() != null ? request.getStaff_type() : StaffType.InHouse;

        // 4. Create Staff
        Staff staff = new Staff();
        staff.setFirstName(request.getFirstName());
        staff.setLastName(request.getLastName());
        staff.setEmail(request.getEmail());
        staff.setPassword(request.getPassword()); // TODO: hash later
        staff.setMobile(request.getMobile());
        staff.setRole(role);
        staff.setStaffType(staffType);

        // 5. Save
        Staff saved = staffRepository.save(staff);

        // 6. Return response
        return new RegisterResponse(
                saved.getId(),
                saved.getFirstName() + " " + saved.getLastName(),
                saved.getEmail(),
                saved.getRole().getTitle(),
                saved.getStaffType(),
                "User registered successfully"
        );
    }

//    @Override
//    public String forgotPassword(ForgotPasswordRequest request) {
//        Staff staff = staffRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));
//
//        // Update password with new one (plain text)
//        staff.setPassword(request.getNewPassword());
//        staffRepository.save(staff);
//
//        return "Password updated successfully for email: " + request.getEmail();
//    }
    
    @Override
    @Transactional
    public String sendResetLink(String email) {
        Staff staff = staffRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        String token = UUID.randomUUID().toString();
        staff.setResetToken(token);
        staff.setResetTokenExpiry(LocalDateTime.now().plusMinutes(30)); // 30 min validity
        staffRepository.save(staff);

        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        System.out.println("Reset link: " + resetLink); // for testing, you can replace with email sending

        return "Password reset link sent! Check console for link.";
    }

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

