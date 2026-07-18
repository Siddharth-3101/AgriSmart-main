package com.auth.controller;

import com.auth.entity.AppUser;
import com.auth.repository.AppUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/api/users/me")
    public String me(@AuthenticationPrincipal UserDetails currentUser) {
        return "Logged in as: " + currentUser.getUsername();
    }

    @GetMapping("/api/users/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails currentUser) {
        AppUser user = appUserRepository.findByEmail(currentUser.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/api/users/profile")
    public ResponseEntity<?> updateProfile(
            @AuthenticationPrincipal UserDetails currentUser,
            @RequestBody AppUser payload
    ) {
        AppUser user = appUserRepository.findByEmail(currentUser.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (payload.getName() != null) user.setName(payload.getName());
        if (payload.getPhone() != null) user.setPhone(payload.getPhone());
        if (payload.getDistrict() != null) user.setDistrict(payload.getDistrict());
        if (payload.getState() != null) user.setState(payload.getState());

        if (payload.getPassword() != null && !payload.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(payload.getPassword()));
        }

        appUserRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
