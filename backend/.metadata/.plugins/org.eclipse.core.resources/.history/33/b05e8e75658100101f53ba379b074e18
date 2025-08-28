

package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.SectionDto;
import com.sunbeam.logsheet.DTO.SubjectDto;
import com.sunbeam.logsheet.DTO.TopicDto;

import java.util.List;

public interface CourseModuleService {


    void addSubject(SubjectDto dto);
    List<SubjectDto> getAllSubjects();
    void updateSubject(Long id, SubjectDto dto);
    void deleteSubject(Long id);

    
    void addSection(SectionDto dto);
    List<SectionDto> getAllSections();
    void updateSection(Long id, SectionDto dto);
    void deleteSection(Long id);
    

 
    ApiResponse<?> addTopic(TopicDto dto);
    List<TopicDto> getAllTopics();
    ApiResponse<?> updateTopic(Long id, TopicDto dto);
    ApiResponse<?> deleteTopic(Long id);
}
