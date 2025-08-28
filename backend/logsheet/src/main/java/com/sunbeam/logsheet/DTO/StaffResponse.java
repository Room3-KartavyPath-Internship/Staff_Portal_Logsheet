package com.sunbeam.logsheet.DTO;




import com.sunbeam.logsheet.entity.StaffType;

import lombok.Data;

@Data
public class StaffResponse {
    private Long id;
    private String fullName;
    private String email;
    private String mobile;
    private StaffType staff_type;
    private String roleName;
	
}
