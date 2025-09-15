package com.sunbeam.logsheet.DTO;

import com.sunbeam.logsheet.entity.StaffType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String mobile;
    private String role; //  "coco", "faculty"
    private StaffType staff_type; // Optional: "IN_HOUSE", "VISITING"
}
