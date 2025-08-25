package com.sunbeam.logsheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.logsheet.entity.CourseCoordinator;

@Repository
public interface CourseCoordinatorRepository  extends JpaRepository<CourseCoordinator, Long>{

}
