package com.sunbeam.logsheet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.logsheet.entity.CourseType;

public interface CourseTypeRepository extends JpaRepository<CourseType,Long> {
	 Optional<CourseType> findByTitle(String title);

}
