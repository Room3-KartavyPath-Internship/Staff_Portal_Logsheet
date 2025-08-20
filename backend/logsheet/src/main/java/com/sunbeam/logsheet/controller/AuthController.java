////package com.sunbeam.logsheet.controller;
////
////import org.springframework.http.ResponseEntity;
////import org.springframework.web.bind.annotation.*;
////
////import com.sunbeam.logsheet.DTO.LoginRequest;
////import com.sunbeam.logsheet.DTO.LoginResponse;
////import com.sunbeam.logsheet.service.AuthService;
////
////import lombok.RequiredArgsConstructor;
////
////@RestController
////@RequestMapping("/auth")
////@RequiredArgsConstructor   // Lombok generates constructor for final fields
////public class AuthController {
////
////    private final AuthService authService;
////
////    @PostMapping("/login")
////    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
////        LoginResponse response = authService.login(loginRequest);
////        return ResponseEntity.ok(response);
////    }
////}
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

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.LoginRequest;
import com.sunbeam.logsheet.DTO.LoginResponse;
import com.sunbeam.logsheet.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse loginResponse = authService.login(request);

            return ResponseEntity.ok(
                new ApiResponse("Login successful", true, loginResponse)
            );

        } catch (RuntimeException ex) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse("Login failed: " + ex.getMessage(), false));
        }
    }
}

