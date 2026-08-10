package com.agrismart.analytics.controller;

import com.agrismart.analytics.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@Tag(name = "Analytics & Reports", description = "Endpoints for generating role-based agricultural dashboard statistics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService= analyticsService;
    }
    @GetMapping("/farmer")
    @PreAuthorize("hasRole('FARMER')")
    @Operation(summary = "Get farmer analytics", description = "Retrieve farm and crop totals, crop yield history, and advice logs for the current farmer.")
    public ResponseEntity<Map<String, Object>> getFarmerAnalytics(Authentication authentication) {
        Long userId = (Long) authentication.getCredentials();
        return ResponseEntity.ok(analyticsService.getFarmerAnalytics(userId));
    }

    @GetMapping("/officer")
    @PreAuthorize("hasAnyRole('OFFICER', 'ADMIN')")
    @Operation(summary = "Get officer analytics", description = "Retrieve regional stats, total farmers registered, crop distribution breakdowns, and risk factors.")
    public ResponseEntity<Map<String, Object>> getOfficerAnalytics() {
        return ResponseEntity.ok(analyticsService.getOfficerAnalytics());
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get admin analytics", description = "Retrieve platform-wide usage metrics, active user registrations, and system health records.")
    public ResponseEntity<Map<String, Object>> getAdminAnalytics() {
        return ResponseEntity.ok(analyticsService.getAdminAnalytics());
    }
}
