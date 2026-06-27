package com.agrismart.crop.dto;

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
    private Long userId;
}
