package com.sunbeam.logsheet.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.logsheet.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	//List<Role> findByTitle(String title);
	Optional<Role> findByTitle(String title);

}

