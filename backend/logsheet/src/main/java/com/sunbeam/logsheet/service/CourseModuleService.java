

package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.SectionDto;
import com.sunbeam.logsheet.DTO.SubjectDto;

import java.util.List;

public interface CourseModuleService {

    // Subject
    void addSubject(SubjectDto dto);
    List<SubjectDto> getAllSubjects();
    void updateSubject(Long id, SubjectDto dto);
    void deleteSubject(Long id);

    // Section
    void addSection(SectionDto dto);
    List<SectionDto> getAllSections();
    void updateSection(Long id, SectionDto dto);
    void deleteSection(Long id);
}
