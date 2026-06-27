package com.agrismart.weather.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ForecastResponse {
    private List<ForecastItem> forecast;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ForecastItem {
        private String date; // e.g. "2026-06-20"
        private Double tempMin;
        private Double tempMax;
        private Double humidity;
        private Double rainfall;
        private String description;
    }
}
