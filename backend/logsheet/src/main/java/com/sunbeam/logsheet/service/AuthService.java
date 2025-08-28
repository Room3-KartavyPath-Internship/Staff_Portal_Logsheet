package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.LoginRequest;
import com.sunbeam.logsheet.DTO.LoginResponse;

public interface AuthService {
	LoginResponse login(LoginRequest loginRequest);
}
