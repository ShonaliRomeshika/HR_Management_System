//package com.hdsr.hr.department.controller;
//
//import com.hdsr.hr.department.model.Department;
//import com.hdsr.hr.department.service.DepartmentService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/departments")
//public class DepartmentController {
//
//    private final DepartmentService departmentService;
//
//    public DepartmentController(DepartmentService departmentService) {
//        this.departmentService = departmentService;
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Department>> getAllDepartments() {
//        return ResponseEntity.ok(departmentService.getAllDepartments());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Department> getDepartmentById(@PathVariable UUID id) {
//    	Department department = departmentService.getDepartmentById(id);
//        return department != null ? ResponseEntity.ok(department) : ResponseEntity.notFound().build();
//    }
//
//    @PostMapping
//    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
//        return ResponseEntity.ok(departmentService.createDepartment(department));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Department> updateDepartment(@PathVariable UUID id, @RequestBody Department updatedDepartment) {
//        Department department = departmentService.updateDepartment(id, updatedDepartment);
//        return department != null ? ResponseEntity.ok(department) : ResponseEntity.notFound().build();
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteDepartment(@PathVariable UUID id) {
//    	departmentService.deleteDepartment(id);
//        return ResponseEntity.noContent().build();
//    }
//}

package com.hdsr.hr.department.controller;

import com.hdsr.hr.auth.JwtUtil;
import com.hdsr.hr.department.model.Department;
import com.hdsr.hr.department.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;
    private final JwtUtil jwtUtil;

    public DepartmentController(DepartmentService departmentService, JwtUtil jwtUtil) {
        this.departmentService = departmentService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        UUID companyId = jwtUtil.extractCompanyId(token);
        System.out.println("Company ID from token: " + companyId);

        // 🔹 Pass companyId to service
        return ResponseEntity.ok(departmentService.getAllDepartmentsByCompany(companyId));
    }

    @PostMapping
    public ResponseEntity<Department> createDepartment(HttpServletRequest request, @RequestBody Department department) {
        String token = request.getHeader("Authorization").substring(7);
        UUID companyId = jwtUtil.extractCompanyId(token);
        department.setCompanyId(companyId);

        return ResponseEntity.ok(departmentService.createDepartment(department));
    }
}

