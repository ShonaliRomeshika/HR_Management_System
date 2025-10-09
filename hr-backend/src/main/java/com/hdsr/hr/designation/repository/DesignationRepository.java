package com.hdsr.hr.designation.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hdsr.hr.designation.model.Designation;

@Repository
public interface DesignationRepository extends JpaRepository<Designation, UUID> {
	List<Designation> findByCompanyId(UUID companyId);
}
