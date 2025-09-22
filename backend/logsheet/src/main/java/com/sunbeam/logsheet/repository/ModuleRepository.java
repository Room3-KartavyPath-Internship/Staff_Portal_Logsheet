package com.sunbeam.logsheet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.sunbeam.logsheet.entity.Module;
import com.sunbeam.logsheet.entity.Subject;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

	Optional<Module> findByTitle(String title);
	
	@Query("SELECT m FROM Module m LEFT JOIN FETCH m.subjects WHERE m.id = :id")
	Optional<Module> findByIdWithSubjects(@Param("id") Long id);

}

