package com.agrismart.weather.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmResponse {
    private Long farmId;
    private String farmName;
    private Double latitude;
    private Double longitude;
    private Long userId;
}
