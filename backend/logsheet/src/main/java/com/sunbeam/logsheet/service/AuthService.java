package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.ForgotPasswordRequest;
import com.sunbeam.logsheet.DTO.LoginRequest;
import com.sunbeam.logsheet.DTO.LoginResponse;
import com.sunbeam.logsheet.DTO.RegisterRequest;
import com.sunbeam.logsheet.DTO.RegisterResponse;

public interface AuthService {
	LoginResponse login(LoginRequest loginRequest);
	RegisterResponse register(RegisterRequest registerRequest);
   
    String sendResetLink(String email); // sends link to email
    String resetPassword(String token, String newPassword); // reset using token
}
