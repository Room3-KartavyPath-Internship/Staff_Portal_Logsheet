
    package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.SectionDto;
import com.sunbeam.logsheet.DTO.SubjectDto;
import com.sunbeam.logsheet.entity.Section;
import com.sunbeam.logsheet.entity.Subject;
import com.sunbeam.logsheet.repository.SectionRepository;
import com.sunbeam.logsheet.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseModuleServiceImpl implements CourseModuleService {

    @Autowired
    private SubjectRepository subjectRepo;

    @Autowired
    private SectionRepository sectionRepo;

    // ---------- SUBJECT CRUD ----------
    @Override
    public void addSubject(SubjectDto dto) {
        Subject subject = new Subject();
        subject.setTitle(dto.getTitle());
        subjectRepo.save(subject);
    }

    @Override
    public List<SubjectDto> getAllSubjects() {
        return subjectRepo.findAll().stream()
                .map(sub -> new SubjectDto(sub.getId(), sub.getTitle()))
                .collect(Collectors.toList());
    }

    @Override
    public void updateSubject(Long id, SubjectDto dto) {
        Subject subject = subjectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        subject.setTitle(dto.getTitle());
        subjectRepo.save(subject);
    }

    @Override
    public void deleteSubject(Long id) {
        if (!subjectRepo.existsById(id)) {
            throw new RuntimeException("Subject not found");
        }
        subjectRepo.deleteById(id);
    }

    // ---------- SECTION CRUD ----------
    @Override
    public void addSection(SectionDto dto) {
        Subject subject = subjectRepo.findById(dto.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        Section section = new Section();
        section.setName(dto.getName());
        section.setSubject(subject);
        sectionRepo.save(section);
    }

    @Override
    public List<SectionDto> getAllSections() {
        return sectionRepo.findAll().stream()
                .map(sec -> new SectionDto(sec.getId(), sec.getName(), sec.getSubject().getId()))
                .collect(Collectors.toList());
    }

    @Override
    public void updateSection(Long id, SectionDto dto) {
        Section section = sectionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        Subject subject = subjectRepo.findById(dto.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        section.setName(dto.getName());
        section.setSubject(subject);
        sectionRepo.save(section);
    }

    @Override
    public void deleteSection(Long id) {
        if (!sectionRepo.existsById(id)) {
            throw new RuntimeException("Section not found");
        }
        sectionRepo.deleteById(id);
    }
}

