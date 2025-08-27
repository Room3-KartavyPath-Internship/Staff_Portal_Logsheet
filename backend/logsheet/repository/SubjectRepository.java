package com.sunbeam.logsheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sunbeam.logsheet.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
