package com.sunbeam.logsheet.DTO;

import com.sunbeam.logsheet.entity.StaffType;
import lombok.Data;

@Data
public class StaffUpdateRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private Long roleId;
    private StaffType staffType;
    
}
