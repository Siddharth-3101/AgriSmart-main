package com.agrismart.weather.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherResponse {
    private Double temperature; // Celsius
    private Double humidity;    // percentage
    private Double rainfall;    // mm
    private String description; // e.g., "scattered clouds", "light rain"
    private Double windSpeed;   // m/s
    private LocalDateTime recordedAt;
}
