package com.hdsr.hr.employee.controller;

import com.hdsr.hr.auth.JwtUtil;
import com.hdsr.hr.employee.model.Employee;
import com.hdsr.hr.employee.service.EmployeeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final JwtUtil jwtUtil;

    public EmployeeController(EmployeeService employeeService, JwtUtil jwtUtil) {
        this.employeeService = employeeService;
        this.jwtUtil = jwtUtil;
    }

    /**
     * ✅ Get all employees for the company from token
     */
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        UUID companyId = jwtUtil.extractCompanyId(token);
        return ResponseEntity.ok(employeeService.getAllEmployeesByCompany(companyId));
    }

    /**
     * ✅ Get a single employee by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable UUID id) {
        Employee employee = employeeService.getEmployeeById(id);
        return employee != null ? ResponseEntity.ok(employee) : ResponseEntity.notFound().build();
    }

    /**
     * ✅ Create employee under the company from token
     */
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        UUID companyId = jwtUtil.extractCompanyId(token);
        employee.setCompanyId(companyId);
        return ResponseEntity.ok(employeeService.createEmployee(employee));
    }

    /**
     * ✅ Update employee
     */
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable UUID id, @RequestBody Employee updatedEmployee) {
        Employee employee = employeeService.updateEmployee(id, updatedEmployee);
        return employee != null ? ResponseEntity.ok(employee) : ResponseEntity.notFound().build();
    }

    /**
     * ✅ Delete employee
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable UUID id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
