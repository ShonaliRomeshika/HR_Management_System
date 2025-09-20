package com.hdsr.hr.designation.controller;

import com.hdsr.hr.designation.model.Designation;
import com.hdsr.hr.designation.service.DesignationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/designations")
public class DesignationController {

    private final DesignationService designationService;

    public DesignationController(DesignationService designationService) {
        this.designationService = designationService;
    }

    @GetMapping
    public ResponseEntity<List<Designation>> getAllDesignations() {
        return ResponseEntity.ok(designationService.getAllDesignations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Designation> getDesignationById(@PathVariable UUID id) {
        Designation designation = designationService.getDesignationById(id);
        return designation != null ? ResponseEntity.ok(designation) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Designation> createDesignation(@RequestBody Designation designation) {
        return ResponseEntity.ok(designationService.createDesignation(designation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Designation> updateDesignation(@PathVariable UUID id, @RequestBody Designation updatedDesignation) {
        Designation designation = designationService.updateDesignation(id, updatedDesignation);
        return designation != null ? ResponseEntity.ok(designation) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDesignation(@PathVariable UUID id) {
        designationService.deleteDesignation(id);
        return ResponseEntity.noContent().build();
    }
}
