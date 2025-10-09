package com.hdsr.hr.employee.service;

import com.hdsr.hr.employee.model.Employee;
import com.hdsr.hr.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployeesByCompany(UUID companyId) {
        return employeeRepository.findByCompanyId(companyId);
    }

    public Employee getEmployeeById(UUID id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(UUID id, Employee updatedEmployee) {
        return employeeRepository.findById(id).map(employee -> {
            employee.setEmployeeCode(updatedEmployee.getEmployeeCode());
            employee.setName(updatedEmployee.getName());
            employee.setDateOfBirth(updatedEmployee.getDateOfBirth());
            employee.setGender(updatedEmployee.getGender());
            employee.setNic(updatedEmployee.getNic());
            employee.setMaritalStatus(updatedEmployee.getMaritalStatus());
            employee.setContactNumber(updatedEmployee.getContactNumber());
            employee.setEmail(updatedEmployee.getEmail());
            employee.setAddress(updatedEmployee.getAddress());
            employee.setDepartment(updatedEmployee.getDepartment());
            employee.setDesignation(updatedEmployee.getDesignation());
            employee.setEmploymentType(updatedEmployee.getEmploymentType());
            employee.setDateOfJoining(updatedEmployee.getDateOfJoining());
            employee.setSalary(updatedEmployee.getSalary());
            return employeeRepository.save(employee);
        }).orElse(null);
    }

    public void deleteEmployee(UUID id) {
        employeeRepository.deleteById(id);
    }
}
