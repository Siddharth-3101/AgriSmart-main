package com.agrismart.crop.dto;

import com.agrismart.crop.entity.CropStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropResponse {
    private Long cropId;
    private String cropName;
    private Integer duration;
    private String description;
    private CropStatus status;
    private String season;
    private LocalDate plantedDate;
    private LocalDate expectedHarvestDate;
    private Long farmId;
    private Double yield;
}
