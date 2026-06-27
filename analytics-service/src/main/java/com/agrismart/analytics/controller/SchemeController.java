package com.agrismart.analytics.controller;

import com.agrismart.analytics.service.SchemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schemes")
@RequiredArgsConstructor
@Tag(name = "Government Schemes & Recommendations", description = "Endpoints for discovering agricultural schemes, checking eligibility, and recommending options")
public class SchemeController {

    private final SchemeService schemeService;

    @GetMapping
    @Operation(summary = "Get all government schemes", description = "Retrieve list of all registered government schemes and subsidies.")
    public ResponseEntity<List<Map<String, Object>>> getAllSchemes() {
        return ResponseEntity.ok(schemeService.getAllSchemes());
    }

    @GetMapping("/recommend")
    @PreAuthorize("hasRole('FARMER')")
    @Operation(summary = "Get scheme recommendations for current user", description = "Calculate and retrieve eligible schemes matching the farmer's state, farm area, and active crops.")
    public ResponseEntity<List<Map<String, Object>>> getRecommendedSchemes(Authentication authentication) {
        Long userId = (Long) authentication.getCredentials();
        return ResponseEntity.ok(schemeService.getRecommendedSchemes(userId));
    }
}
