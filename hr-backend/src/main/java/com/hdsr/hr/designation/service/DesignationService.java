package com.hdsr.hr.designation.service;

import com.hdsr.hr.department.model.Department;
import com.hdsr.hr.designation.model.Designation;
import com.hdsr.hr.designation.repository.DesignationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DesignationService {

    private final DesignationRepository designationRepository;

    public DesignationService(DesignationRepository designationRepository) {
        this.designationRepository = designationRepository;
    }

    public List<Designation> getAllDesignationsByCompany(UUID companyId) {
        return designationRepository.findByCompanyId(companyId);
    }

    public Designation getDesignationById(UUID id) {
        return designationRepository.findById(id).orElse(null);
    }

    public Designation createDesignation(Designation designation) {
        return designationRepository.save(designation);
    }

    public Designation updateDesignation(UUID id, Designation updatedDesignation) {
        return designationRepository.findById(id).map(designation -> {
            designation.setTitle(updatedDesignation.getTitle());
            designation.setDescription(updatedDesignation.getDescription());
            return designationRepository.save(designation);
        }).orElse(null);
    }

    public void deleteDesignation(UUID id) {
        designationRepository.deleteById(id);
    }
}
