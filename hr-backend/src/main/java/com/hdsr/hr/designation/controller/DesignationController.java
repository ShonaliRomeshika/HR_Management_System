package com.hdsr.hr.designation.controller;

import com.hdsr.hr.auth.JwtUtil;
import com.hdsr.hr.designation.model.Designation;
import com.hdsr.hr.designation.service.DesignationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/designations")
public class DesignationController {

    private final DesignationService designationService;
    private final JwtUtil jwtUtil;

    public DesignationController(DesignationService designationService, JwtUtil jwtUtil) {
        this.designationService = designationService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<Designation>> getAllDesignations(HttpServletRequest request) {
        // Extract token from header
        String token = request.getHeader("Authorization").substring(7);
        UUID companyId = jwtUtil.extractCompanyId(token);

        // Get designations belonging to that company
        return ResponseEntity.ok(designationService.getAllDesignationsByCompany(companyId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Designation> getDesignationById(@PathVariable UUID id) {
        Designation designation = designationService.getDesignationById(id);
        return designation != null ? ResponseEntity.ok(designation) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Designation> createDesignation(@RequestBody Designation designation, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        UUID companyId = jwtUtil.extractCompanyId(token);
        designation.setCompanyId(companyId); // ✅ ensure companyId is set before saving
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
