package com.sunbeam.logsheet.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.entity.Premises;
import com.sunbeam.logsheet.service.PremisesService;

@RestController
@RequestMapping("/api/premises")
public class PremisesController {
    
    private final PremisesService service;

    public PremisesController(PremisesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createPremises(@RequestBody Premises premises) {
        service.addPremises(premises);
        return ResponseEntity.ok(new ApiResponse<>("Premises created successfully!", true));
    }


    public ResponseEntity<List<Premises>> getAllPremises() {
        return ResponseEntity.ok(service.getAllPremises());
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getPremisesById(@PathVariable Long id) {
        Premises premises = service.getPremisesById(id);
        if (premises != null) {
            return ResponseEntity.ok(premises);
        } else {
            return ResponseEntity.status(404).body(new ApiResponse<>("Premises not found!", false));
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updatePremises(@PathVariable Long id, @RequestBody Premises updatedPremises) {
        ApiResponse<?> updated = service.updatePremises(id, updatedPremises);
        if (updated != null) {
            return ResponseEntity.ok(new ApiResponse<>("Premises updated successfully!", true));
        } else {
            return ResponseEntity.status(404).body(new ApiResponse<>("Premises not found!", false));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deletePremises(@PathVariable Long id) {
        ApiResponse<?> response = service.deletePremises(id);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(response);
        }
    }

}
