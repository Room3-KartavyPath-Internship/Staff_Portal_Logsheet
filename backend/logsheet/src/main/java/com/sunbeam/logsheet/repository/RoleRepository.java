package com.sunbeam.logsheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.logsheet.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	 
}
