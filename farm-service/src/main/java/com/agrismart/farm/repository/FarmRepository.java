package com.agrismart.farm.repository;

import com.agrismart.farm.entity.Farm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Long> {
    Page<Farm> findByUserId(Long userId, Pageable pageable);
    List<Farm> findByUserId(Long userId);
    long countByUserId(Long userId);
}
