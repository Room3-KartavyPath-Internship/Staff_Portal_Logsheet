package com.sunbeam.logsheet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sunbeam.logsheet.entity.MenuItem;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long>{
	
	 @Query("SELECT m FROM MenuItem m JOIN RoleMenuPermission rmp ON m.id = rmp.menuItem.id " +
	           "WHERE rmp.role.id = :roleId AND rmp.allowed = true")
	    List<MenuItem> findAllowedMenusByRoleId(@Param("roleId") Long roleId);
}
