//
//package com.sunbeam.logsheet.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.sunbeam.logsheet.DTO.LoginRequest;
//import com.sunbeam.logsheet.DTO.LoginResponse;
//import com.sunbeam.logsheet.service.AuthService;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private AuthService authService;
//
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
//        LoginResponse response = authService.login(loginRequest);
//        return ResponseEntity.ok(response);
//    }
//}
package com.sunbeam.logsheet.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {

    @Autowired
    private AuthService authService;

    // ✅ Login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    // ✅ Register
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
        RegisterResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(response);
    }

//    // ✅ Forgot Password
//    @PostMapping("/forgot-password")
//    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
//        String response = authService.forgotPassword(request);
//        return ResponseEntity.ok(response);
//    }
    
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
