package com.sunbeam.logsheet.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.sunbeam.logsheet.entity.Premises;
import com.sunbeam.logsheet.repository.PremisesRepository;

@Service
public class PremisesService {

    private final PremisesRepository repository;

    public PremisesService(PremisesRepository repository) {
        this.repository = repository;
    }

    public Premises addPremises(Premises premises) {
        return repository.save(premises);
    }

    public List<Premises> getAllPremises() {
        return repository.findAll();
    }

    public Premises getPremisesById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Premises updatePremises(Long id, Premises updatedPremises) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(updatedPremises.getTitle());
            existing.setAddress(updatedPremises.getAddress());
            existing.setDescription(updatedPremises.getDescription());
            return repository.save(existing);
        }).orElse(null);
    }

    public void deletePremises(Long id) {
        repository.deleteById(id);
    }
}
