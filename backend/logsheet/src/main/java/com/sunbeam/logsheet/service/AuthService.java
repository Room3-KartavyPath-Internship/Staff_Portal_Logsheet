package com.sunbeam.logsheet.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sunbeam.logsheet.DTO.LoginRequest;
import com.sunbeam.logsheet.DTO.LoginResponse;
import com.sunbeam.logsheet.entity.Staff;
import com.sunbeam.logsheet.exception.InvalidCredentialsException;
import com.sunbeam.logsheet.repository.StaffRepository;

@Service
public class AuthService {

    @Autowired
    private StaffRepository staffRepository;

    public LoginResponse login(LoginRequest loginRequest) {
        Optional<Staff> staffOpt = staffRepository.findByEmail(loginRequest.getEmail());

        if (!staffOpt.isPresent()) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        Staff staff = staffOpt.get();

        if (staff.getPassword() == null) {
            throw new InvalidCredentialsException("Password in DB is NULL");
        }

        System.out.println("DB password: " + staff.getPassword());
        System.out.println("Request password: " + loginRequest.getPassword());

        if (!staff.getPassword().equals(loginRequest.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }// here we are checking if entered password and DB password is same or not

        return new LoginResponse(
                staff.getId(),
                staff.getFirstName() + " " + staff.getLastName(), 
                staff.getRole().getTitle()
        );

    }
}
