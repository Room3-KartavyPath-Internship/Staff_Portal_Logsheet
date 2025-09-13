package com.sunbeam.logsheet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sunbeam.logsheet.entity.Module;
import com.sunbeam.logsheet.entity.Subject;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

	Optional<Subject> findByTitle(String title);
}

