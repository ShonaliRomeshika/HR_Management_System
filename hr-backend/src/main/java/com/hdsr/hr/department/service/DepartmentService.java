package com.hdsr.hr.department.service;

import com.hdsr.hr.department.model.Department;
import com.hdsr.hr.department.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

//    public List<Department> getAllDepartments() {
//        return departmentRepository.findAll();
//    }
    public List<Department> getAllDepartmentsByCompany(UUID companyId) {
        return departmentRepository.findByCompanyId(companyId);
    }

    public Department getDepartmentById(UUID id) {
        return departmentRepository.findById(id).orElse(null);
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(UUID id, Department updatedDepartment) {
        return departmentRepository.findById(id).map(department -> {
            department.setName(updatedDepartment.getName());
            department.setDescription(updatedDepartment.getDescription());
            return departmentRepository.save(department);
        }).orElse(null);
    }

    public void deleteDepartment(UUID id) {
    	departmentRepository.deleteById(id);
    }
}
