package com.sunbeam.logsheet.repository;

import com.sunbeam.logsheet.entity.GroupMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GroupMasterRepository extends JpaRepository<GroupMaster, Long> {

    
    List<GroupMaster> findByCourse_Name(String courseName);

    
    List<GroupMaster> findByCourse_Id(Long courseId);
}
