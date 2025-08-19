package com.sunbeam.logsheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sunbeam.logsheet.entity.Premises;

public interface PremisesRepository extends JpaRepository<Premises, Long> {
}
