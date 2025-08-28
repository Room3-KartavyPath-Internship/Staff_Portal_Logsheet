package com.sunbeam.logsheet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sunbeam.logsheet.entity.Premises;

public interface PremisesRepository extends JpaRepository<Premises, Long> {

	Optional<Premises> findByTitle(String title);
}
