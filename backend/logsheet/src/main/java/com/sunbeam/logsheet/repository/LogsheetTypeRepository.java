package com.sunbeam.logsheet.repository;

import com.sunbeam.logsheet.entity.LogsheetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogsheetTypeRepository extends JpaRepository<LogsheetType, Long> {
    
}
