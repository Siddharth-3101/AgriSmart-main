package com.agrismart.user.controller;

import com.agrismart.user.dto.*;
import com.agrismart.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "Endpoints for user registration, authentication, and profile management")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
    	this.userService=userService;
    }
    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Create a new user account with role FARMER, OFFICER, or ADMIN")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        return new ResponseEntity<>(userService.register(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "User authentication", description = "Login with email and password to receive a JWT access token")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping("/profile")
    @Operation(summary = "Get current user profile", description = "Retrieve profile details of the currently authenticated user")
    public ResponseEntity<UserResponse> getProfile(Authentication authentication) {
        Long userId = (Long) authentication.getCredentials();
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update current user profile", description = "Modify profile details (name, phone, location, password) of the current user")
    public ResponseEntity<UserResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody ProfileRequest request
    ) {
        Long userId = (Long) authentication.getCredentials();
        return ResponseEntity.ok(userService.updateProfile(userId, request));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user details by ID", description = "Retrieve public profile details of any user by their ID")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('OFFICER', 'ADMIN')")
    @Operation(summary = "Get all users", description = "Retrieve a paginated list of all users")
    public ResponseEntity<Page<UserResponse>> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok(userService.getAllUsers(pageable));
    }

    @GetMapping("/farmers")
    @PreAuthorize("hasAnyRole('OFFICER', 'ADMIN')")
    @Operation(summary = "Get all farmers", description = "Retrieve an unpaginated list of all farmers")
    public ResponseEntity<List<UserResponse>> getAllFarmers() {
        return ResponseEntity.ok(userService.getAllFarmers());
    }
}
