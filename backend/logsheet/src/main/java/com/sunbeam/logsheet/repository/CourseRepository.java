package com.sunbeam.logsheet.repository;

import com.sunbeam.logsheet.entity.Course;
import com.sunbeam.logsheet.entity.Premises;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
	
    List<Course> findByPremise(Premises premise);

	
}
