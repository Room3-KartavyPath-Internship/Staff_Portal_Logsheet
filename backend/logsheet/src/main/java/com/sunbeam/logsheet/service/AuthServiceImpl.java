
package com.sunbeam.logsheet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.logsheet.DTO.LoginRequest;
import com.sunbeam.logsheet.DTO.LoginResponse;
import com.sunbeam.logsheet.entity.Staff;
import com.sunbeam.logsheet.repository.StaffRepository;


@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private StaffRepository staffRepository;

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
}

