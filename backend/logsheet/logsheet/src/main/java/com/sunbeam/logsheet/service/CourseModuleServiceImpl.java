
    package com.sunbeam.logsheet.service;
    import com.sunbeam.logsheet.entity.Module;


import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.ModuleDto;
import com.sunbeam.logsheet.DTO.SectionDto;
import com.sunbeam.logsheet.DTO.SubjectDto;
import com.sunbeam.logsheet.DTO.TopicDto;
import com.sunbeam.logsheet.entity.Section;
import com.sunbeam.logsheet.entity.Subject;
import com.sunbeam.logsheet.entity.Topic;
import com.sunbeam.logsheet.repository.ModuleRepository;
import com.sunbeam.logsheet.repository.SectionRepository;
import com.sunbeam.logsheet.repository.SubjectRepository;
import com.sunbeam.logsheet.repository.TopicRepository;

import jakarta.transaction.Transactional;

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
    
    @Autowired
    private TopicRepository topicRepo;
    
    @Autowired
    private ModuleRepository moduleRepo;

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

    
    //Topic
    
	@Override
	public ApiResponse addTopic(TopicDto dto) {
		Section section = sectionRepo.findById(dto.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found"));
        Topic topic = new Topic();
        topic.setName(dto.getName());
        topic.setSection(section);
        topicRepo.save(topic);
        return new ApiResponse("Topic added successfully", true);
	}

	@Override
	public List<TopicDto> getAllTopics() {
		 return topicRepo.findAll().stream()
	                .map(top -> new TopicDto(top.getId(), top.getName(), top.getSection().getId()))
	                .collect(Collectors.toList());
	}

	@Override
	public ApiResponse updateTopic(Long id, TopicDto dto) {
		Topic topic = topicRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        Section section = sectionRepo.findById(dto.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found"));
        topic.setName(dto.getName());
        topic.setSection(section);
        topicRepo.save(topic);
        return new ApiResponse("Topic updated", true);
	}

	@Override
	public ApiResponse deleteTopic(Long id) {
		if (!topicRepo.existsById(id)) {
            return new ApiResponse("Topic not found", false);
        }
        topicRepo.deleteById(id);
        return new ApiResponse("Topic deleted", true);
	}

	
	//module
	@Override
	public ApiResponse addModule(ModuleDto dto) {
	    Module module = new Module();
	    module.setTitle(dto.getTitle());
	    module.setDescription(dto.getDescription());
	    module.setTheoryHours(dto.getTheoryHours());
	    module.setPracticalHours(dto.getPracticalHours());
	    module.setModuleRouterId(dto.getModuleRouterId());

	    if (dto.getSubjectIds() != null) {
	        module.setSubjects(dto.getSubjectIds().stream()
	                .map(id -> subjectRepo.findById(id)
	                        .orElseThrow(() -> new RuntimeException("Subject not found")))
	                .collect(Collectors.toSet()));
	    }

	    moduleRepo.save(module);
	    return new ApiResponse("Module added successfully", true);
	}

	@Transactional
	@Override
	public List<ModuleDto> getAllModules() {
	    return moduleRepo.findAll().stream()
	            .map(mod -> new ModuleDto(
	                    mod.getId(),
	                    mod.getTitle(),
	                    mod.getDescription(),
	                    mod.getTheoryHours(),
	                    mod.getPracticalHours(),
	                    mod.getModuleRouterId(),
	                    mod.getSubjects().stream()
	                            .map(Subject::getId) // Access inside transaction
	                            .collect(Collectors.toSet())
	            ))
	            .collect(Collectors.toList());
	}

	@Override
	public ApiResponse updateModule(Long id, ModuleDto dto) {
	    Module module = moduleRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Module not found"));

	    module.setTitle(dto.getTitle());
	    module.setDescription(dto.getDescription());
	    module.setTheoryHours(dto.getTheoryHours());
	    module.setPracticalHours(dto.getPracticalHours());
	    module.setModuleRouterId(dto.getModuleRouterId());

	    if (dto.getSubjectIds() != null) {
	        module.setSubjects(dto.getSubjectIds().stream()
	                .map(subjectId -> subjectRepo.findById(subjectId)
	                        .orElseThrow(() -> new RuntimeException("Subject not found")))
	                .collect(Collectors.toSet()));
	    }

	    moduleRepo.save(module);
	    return new ApiResponse("Module updated successfully", true);
	}

//	@Override
//	public ApiResponse deleteModule(Long id) {
//	    if (!moduleRepo.existsById(id)) {
//	        return new ApiResponse("Module not found", false);
//	    }
//	    moduleRepo.deleteById(id);
//	    return new ApiResponse("Module deleted", true);
//	}
	
	@Transactional
	@Override
	public ApiResponse deleteModule(Long id) {
	    Module module = moduleRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Module not found"));

	    // Clear subjects to remove join-table entries
	    module.getSubjects().clear();
	    moduleRepo.save(module); // Update module after clearing relations

	    // Now delete safely
	    moduleRepo.delete(module);

	    return new ApiResponse("Module deleted successfully", true);
	}




    
}

