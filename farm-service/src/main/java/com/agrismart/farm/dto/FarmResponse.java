package com.agrismart.farm.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmResponse {
    private Long farmId;
    private String farmName;
    private String location;
    private Double area;
    private String soilType;
    private String waterSource;
    private Double latitude;
    private Double longitude;
    private Long userId;
}
