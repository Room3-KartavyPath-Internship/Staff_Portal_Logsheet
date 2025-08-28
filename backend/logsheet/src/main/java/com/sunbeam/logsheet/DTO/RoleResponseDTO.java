package com.sunbeam.logsheet.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleResponseDTO {

	private Long id;
    private String title;
    private String description;
    private List<RoleMenuPermissionDTO> menuPermissions;

}
