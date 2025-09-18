package com.sunbeam.logsheet.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ApiResponse<?>> addBatchCycle(@RequestBody BatchCycle batchCycle) {
        ApiResponse<?> resp = service.addBatchCycle(batchCycle);
        return ResponseEntity.ok(resp);
    }

    @GetMapping
    public ResponseEntity<List<BatchCycle>> getAllBatchCycles() {
        return ResponseEntity.ok(service.getAllBatchCycles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBatchCycleById(@PathVariable Long id) {
        BatchCycle bc = service.getBatchCycleById(id);
        return ResponseEntity.ok(bc);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateBatchCycle(@PathVariable Long id, @RequestBody BatchCycle updated) {
        ApiResponse<?> resp = service.updateBatchCycle(id, updated);
        return ResponseEntity.ok(resp);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteBatchCycle(@PathVariable Long id) {
        ApiResponse<?> resp = service.deleteBatchCycle(id);
        return ResponseEntity.ok(resp);
    }
}
