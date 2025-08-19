package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.LoginRequest;
import com.sunbeam.logsheet.DTO.LoginResponse;
import com.sunbeam.logsheet.entity.Staff;
import com.sunbeam.logsheet.exception.InvalidCredentialsException;
import com.sunbeam.logsheet.repository.StaffRepository;
import com.sunbeam.logsheet.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final StaffRepository staffRepository;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Staff staff = staffRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (staff.getPassword() == null) {
            throw new InvalidCredentialsException("Password in DB is NULL");
        }

        System.out.println("DB password: " + staff.getPassword());
        System.out.println("Request password: " + loginRequest.getPassword());

        if (!staff.getPassword().equals(loginRequest.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return new LoginResponse(
                staff.getId(),
                staff.getFirstName() + " " + staff.getLastName(),
                staff.getRole().getTitle()
        );
    }
}
