package com.sunbeam.logsheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sunbeam.logsheet.entity.Section;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long> {
}
