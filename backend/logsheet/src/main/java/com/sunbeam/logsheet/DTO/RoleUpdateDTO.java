package com.sunbeam.logsheet.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleUpdateDTO {
	 private String title;
	    private String description;
	    private List<RoleMenuPermissionDTO> menuPermissions;
}
