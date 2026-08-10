package com.agrismart.farm.service;

import com.agrismart.farm.dto.FarmRequest;
import com.agrismart.farm.dto.FarmResponse;
import com.agrismart.farm.entity.Farm;
import com.agrismart.farm.exception.BadRequestException;
import com.agrismart.farm.exception.ResourceNotFoundException;
import com.agrismart.farm.repository.FarmRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FarmService {

    private final FarmRepository farmRepository;
    public FarmService(FarmRepository farmRepository) {
    	this.farmRepository=farmRepository;
    }
    @Transactional
    public FarmResponse addFarm(FarmRequest request, Long userId) {
        Farm farm = Farm.builder()
                .farmName(request.getFarmName())
                .location(request.getLocation())
                .area(request.getArea())
                .soilType(request.getSoilType())
                .waterSource(request.getWaterSource())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .userId(userId)
                .build();

        Farm savedFarm = farmRepository.save(farm);
        return mapToFarmResponse(savedFarm);
    }

    @Transactional
    public FarmResponse updateFarm(Long farmId, FarmRequest request, Long userId, String userRole) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found with id: " + farmId));

        // Enforce ownership for farmers
        if ("ROLE_FARMER".equals(userRole) && !farm.getUserId().equals(userId)) {
            throw new BadRequestException("You do not own this farm and cannot modify it.");
        }

        farm.setFarmName(request.getFarmName());
        farm.setLocation(request.getLocation());
        farm.setArea(request.getArea());
        farm.setSoilType(request.getSoilType());
        farm.setWaterSource(request.getWaterSource());
        farm.setLatitude(request.getLatitude());
        farm.setLongitude(request.getLongitude());

        Farm updatedFarm = farmRepository.save(farm);
        return mapToFarmResponse(updatedFarm);
    }

    @Transactional
    public void deleteFarm(Long farmId, Long userId, String userRole) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found with id: " + farmId));

        // Enforce ownership for farmers
        if ("ROLE_FARMER".equals(userRole) && !farm.getUserId().equals(userId)) {
            throw new BadRequestException("You do not own this farm and cannot delete it.");
        }

        farmRepository.delete(farm);
    }

    public FarmResponse getFarmById(Long farmId, Long userId, String userRole) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found with id: " + farmId));

        // Enforce ownership for farmers
        if ("ROLE_FARMER".equals(userRole) && !farm.getUserId().equals(userId)) {
            throw new BadRequestException("Access denied: You do not own this farm.");
        }

        return mapToFarmResponse(farm);
    }

    public Page<FarmResponse> viewFarms(Long userId, String userRole, Pageable pageable) {
        Page<Farm> farmPage;
        if ("ROLE_FARMER".equals(userRole)) {
            farmPage = farmRepository.findByUserId(userId, pageable);
        } else {
            // ADMIN or OFFICER can view all farms
            farmPage = farmRepository.findAll(pageable);
        }
        return farmPage.map(this::mapToFarmResponse);
    }

    private FarmResponse mapToFarmResponse(Farm farm) {
        return FarmResponse.builder()
                .farmId(farm.getFarmId())
                .farmName(farm.getFarmName())
                .location(farm.getLocation())
                .area(farm.getArea())
                .soilType(farm.getSoilType())
                .waterSource(farm.getWaterSource())
                .latitude(farm.getLatitude())
                .longitude(farm.getLongitude())
                .userId(farm.getUserId())
                .build();
    }
}
