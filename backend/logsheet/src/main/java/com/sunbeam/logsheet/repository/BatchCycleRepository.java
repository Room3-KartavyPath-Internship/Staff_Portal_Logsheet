package com.sunbeam.logsheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.logsheet.entity.BatchCycle;

@Repository
public interface BatchCycleRepository extends JpaRepository<BatchCycle, Long>  {

}
