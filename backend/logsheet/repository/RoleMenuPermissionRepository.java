package com.sunbeam.logsheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.logsheet.entity.RoleMenuId;
import com.sunbeam.logsheet.entity.RoleMenuPermission;

public interface RoleMenuPermissionRepository extends JpaRepository<RoleMenuPermission, RoleMenuId>{

}
