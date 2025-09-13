package com.sunbeam.logsheet.repository;

import com.sunbeam.logsheet.DTO.CourseProgressReportDTO;
import com.sunbeam.logsheet.entity.Logsheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseProgressReportRepository extends JpaRepository<Logsheet, Long> {

    @Query("SELECT new com.sunbeam.logsheet.DTO.CourseProgressReportDTO(" +
           "c.name, m.title, c.startDate, c.endDate, " +
           "m.theoryHours, m.practicalHours, " +
           "(m.theoryHours + m.practicalHours), " +
           "CONCAT(s.firstName ,' ',s.lastName)) " +
           "FROM Logsheet l " +
           "JOIN l.course c " +
           "JOIN l.module m " +
           "LEFT JOIN l.staff s " +
           "WHERE LOWER(c.name) = LOWER(:courseName)")
    List<CourseProgressReportDTO> getCourseProgressReportByCourseName(String courseName);
}
