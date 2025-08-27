package com.sunbeam.logsheet.DTO;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleMenuPermissionDTO {	
	 private Long roleId; 
	private Long menuItemId;
    private boolean allowed;
}
