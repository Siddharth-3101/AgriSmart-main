package com.agrismart.farm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "farms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "farm_id")
    private Long farmId;

    @Column(name = "farm_name", nullable = false, length = 100)
    private String farmName;

    @Column(nullable = false, length = 255)
    private String location;

    @Column(nullable = false)
    private Double area;

    @Column(name = "soil_type", length = 50)
    private String soilType;

    @Column(name = "water_source", length = 100)
    private String waterSource;

    private Double latitude;
    private Double longitude;

    @Column(name = "user_id", nullable = false)
    private Long userId;
}
