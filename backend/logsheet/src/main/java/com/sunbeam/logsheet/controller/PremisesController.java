package com.sunbeam.logsheet.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.logsheet.service.PremisesService;
import com.sunbeam.logsheet.entity.Premises;

@RestController
@RequestMapping("/premises")
public class PremisesController {

    private final PremisesService service;

    public PremisesController(PremisesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Premises> createPremises(@RequestBody Premises premises) {
        return ResponseEntity.ok(service.addPremises(premises));
    }

    @GetMapping
    public ResponseEntity<List<Premises>> getAllPremises() {
        return ResponseEntity.ok(service.getAllPremises());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Premises> getPremisesById(@PathVariable Long id) {
        Premises premises = service.getPremisesById(id);
        return premises != null ? ResponseEntity.ok(premises) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Premises> updatePremises(@PathVariable Long id, @RequestBody Premises premises) {
        Premises updated = service.updatePremises(id, premises);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePremises(@PathVariable Long id) {
        service.deletePremises(id);
        return ResponseEntity.noContent().build();
    }
}
