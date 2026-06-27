package com.agrismart.crop.repository;

import com.agrismart.crop.entity.Crop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    Page<Crop> findByFarmIdIn(List<Long> farmIds, Pageable pageable);
    List<Crop> findByFarmId(Long farmId);
    Page<Crop> findByFarmId(Long farmId, Pageable pageable);
    long countByFarmIdIn(List<Long> farmIds);
}
