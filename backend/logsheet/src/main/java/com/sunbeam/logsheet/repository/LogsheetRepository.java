package com.sunbeam.logsheet.repository;

import com.sunbeam.logsheet.entity.Logsheet;
import com.sunbeam.logsheet.entity.Logsheet.Status;
import com.sunbeam.logsheet.entity.Logsheet.VerificationStatus;
import com.sunbeam.logsheet.entity.Logsheet.ApprovalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogsheetRepository extends JpaRepository<Logsheet, Long> {

  
    List<Logsheet> findByCourseId(Long courseId);

    List<Logsheet> findByStaffId(Long staffId);

    List<Logsheet> findByStatus(Status status);

    List<Logsheet> findByVerificationStatus(VerificationStatus verificationStatus);

    List<Logsheet> findByApprovalStatus(ApprovalStatus approvalStatus);

    List<Logsheet> findByModuleId(Long moduleId);

    List<Logsheet> findByEntryType(Logsheet.EntryType entryType);
}
