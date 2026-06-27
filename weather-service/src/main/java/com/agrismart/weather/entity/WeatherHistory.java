package com.agrismart.weather.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weather_id")
    private Long weatherId;

    @Column(nullable = false)
    private Double temperature;

    private Double rainfall; // in mm

    private Double humidity; // in percentage

    @Column(name = "recorded_at", nullable = false)
    private LocalDateTime recordedAt;

    @Column(name = "weather_condition", length = 100)
    private String weatherCondition;

    @Column(name = "farm_id", nullable = false)
    private Long farmId;

    @PrePersist
    protected void onCreate() {
        recordedAt = LocalDateTime.now();
    }
}
