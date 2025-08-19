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
    public ResponseEntity<BatchCycle> createBatchCycle(@RequestBody BatchCycle batchCycle) {
        return ResponseEntity.ok(service.addBatchCycle(batchCycle));
    }

    
    @GetMapping
    public ResponseEntity<List<BatchCycle>> getAllBatchCycles() {
        return ResponseEntity.ok(service.getAllBatchCycles());
    }
    
 
    @GetMapping("/{id}")
    public ResponseEntity<BatchCycle> getBatchCycleById(@PathVariable Long id) {
              BatchCycle cycle = service.getBatchCycleById(id);
          return cycle != null ? ResponseEntity.ok(cycle) : ResponseEntity.notFound().build();
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<BatchCycle> updateBatchCycle(@PathVariable Long id, @RequestBody BatchCycle batchCycle) {
         BatchCycle updated = service.updateBatchCycle(id, batchCycle);
        return updated != null ?  ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
     
//       @DeleteMapping("/{id}")
//      public ResponseEntity<Void> deleteBatchCycle(@PathVariable Long id) {
//        service.deleteBatchCycle(id);
//        return ResponseEntity.noContent().build();
//    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBatchCycle(@PathVariable Long id) {
        service.deleteBatchCycle(id);
        return ResponseEntity.ok("BatchCycle deleted successfully!");
    }

}
