

package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.entity.BatchCycle;
import com.sunbeam.logsheet.repository.BatchCycleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchCycleServiceImpl implements IBatchCycleService {

    private final BatchCycleRepository repository;

    public BatchCycleServiceImpl(BatchCycleRepository repository) {
        this.repository = repository;
    }

    @Override
    public BatchCycle addBatchCycle(BatchCycle batchCycle) {
        repository.findByTitle(batchCycle.getTitle())
                .ifPresent(bc -> {
                    throw new RuntimeException("Batch cycle with title '" + batchCycle.getTitle() + "' already exists");
                });
        return repository.save(batchCycle);
    }

    @Override
    public List<BatchCycle> getAllBatchCycles() {
        return repository.findAll();
    }

    @Override
    public BatchCycle getBatchCycleById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch cycle with ID " + id + " not found"));
    }

    @Override
    public ApiResponse<?> updateBatchCycle(Long id, BatchCycle updatedCycle) {
        BatchCycle existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch cycle not found with id: " + id));

        existing.setTitle(updatedCycle.getTitle());
        existing.setDescription(updatedCycle.getDescription());
        existing.setStartDate(updatedCycle.getStartDate());
        existing.setEndDate(updatedCycle.getEndDate());

        repository.save(existing);
        return new ApiResponse<>("Updated Successfully", true);
    }

    @Override
    public ApiResponse<?> deleteBatchCycle(Long id) {
        BatchCycle batchCycle = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch cycle with ID " + id + " not found"));

        repository.delete(batchCycle);
        return new ApiResponse<>("Successfully deleted", true);
    }
}
