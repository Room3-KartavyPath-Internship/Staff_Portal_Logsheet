package com.sunbeam.logsheet.controller;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.entity.BatchCycle;

import com.sunbeam.logsheet.service.IBatchCycleService;

@RestController
@RequestMapping("/api/batch-cycles")
public class BatchCycleController {
	
	private final IBatchCycleService service;

    public BatchCycleController(IBatchCycleService service) {
        this.service = service;
    }

    
    @PostMapping
    public ResponseEntity<ApiResponse> addBatchCycle(@RequestBody BatchCycle batchCycle) {
        service.addBatchCycle(batchCycle);
        return ResponseEntity.ok(new ApiResponse("Batch cycle added successfully", true));
    }

    
    @GetMapping
    public ResponseEntity<List<BatchCycle>> getAllBatchCycles() {
        return ResponseEntity.ok(service.getAllBatchCycles());
    }
    
   
    @GetMapping("/{id}")
    public ResponseEntity<?> getBatchCycleById(@PathVariable Long id) {
        BatchCycle bc = service.getBatchCycleById(id);
        if (bc != null) {
            return ResponseEntity.ok(bc);
        } else {
            return ResponseEntity.status(404).body(new ApiResponse("Batch cycle not found", false));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateBatchCycle(@PathVariable Long id, @RequestBody BatchCycle updated) {
        service.updateBatchCycle(id, updated);
        return ResponseEntity.ok(new ApiResponse("Batch cycle updated successfully", true));
    }
    
   
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBatchCycle(@PathVariable Long id) {
        service.deleteBatchCycle(id);
        return ResponseEntity.ok(new ApiResponse("Batch cycle deleted successfully", true));
    }


}
