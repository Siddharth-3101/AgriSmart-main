package com.agrismart.crop.dto;

import com.agrismart.crop.entity.CropStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropRequest {

    @NotBlank(message = "Crop name is required")
    private String cropName;

    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    private Integer duration; // in days

    private String description;

    @NotNull(message = "Crop status is required")
    private CropStatus status;

    private String season;

    @NotNull(message = "Planted date is required")
    private LocalDate plantedDate;

    private LocalDate expectedHarvestDate;

    @NotNull(message = "Farm ID is required")
    private Long farmId;

    private Double yield;
}
