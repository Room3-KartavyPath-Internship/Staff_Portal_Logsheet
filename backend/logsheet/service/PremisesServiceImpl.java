package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.entity.Premises;
import com.sunbeam.logsheet.repository.CourseRepository;
import com.sunbeam.logsheet.repository.PremisesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PremisesServiceImpl implements PremisesService {
	
	@Autowired
	    private PremisesRepository repository;

    public PremisesServiceImpl(PremisesRepository repository, CourseRepository courseRepository) {
        this.repository = repository;
    }

    @Override
    public Premises addPremises(Premises premises) {
        repository.findByTitle(premises.getTitle())
                .ifPresent(p -> {
                    throw new RuntimeException("Premises with title '" + premises.getTitle() + "' already exists");
                });
        return repository.save(premises);
    }

    @Override
    public List<Premises> getAllPremises() {
        return repository.findAll();
    }

    @Override
    public Premises getPremisesById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Premises with ID " + id + " not found"));
    }

    @Override
    public ApiResponse<?> updatePremises(Long id, Premises updatedPremises) {
        Premises existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Premises not found with id: " + id));

        existing.setTitle(updatedPremises.getTitle());
        existing.setAddress(updatedPremises.getAddress());
        existing.setDescription(updatedPremises.getDescription());

        repository.save(existing);
        return new ApiResponse<>("Premises updated successfully", true);
    }

    @Override
    public ApiResponse<?> deletePremises(Long id) {
        if (repository.existsById(id)) {
        	
        	 Premises premise = repository.findById(id)
                     .orElseThrow(() -> new RuntimeException("Premise not found with id " + id));
        	
            repository.delete(premise);
           
            return new ApiResponse<>("deleted",true) ;
            
        }
        return new ApiResponse<>("Premises not found!", false);
    }

}
