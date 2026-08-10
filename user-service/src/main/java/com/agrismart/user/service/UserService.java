package com.agrismart.user.service;

import com.agrismart.user.dto.*;
import com.agrismart.user.entity.User;
import com.agrismart.user.exception.BadRequestException;
import com.agrismart.user.exception.ResourceNotFoundException;
import com.agrismart.user.repository.UserRepository;
import com.agrismart.user.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.agrismart.user.entity.Role;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder,JwtUtils jwtUtils) {
    	this.userRepository=userRepository;
    	this.passwordEncoder=passwordEncoder;
    	this.jwtUtils=jwtUtils;
    }
    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .district(request.getDistrict())
                .state(request.getState())
                .build();

        User savedUser = userRepository.save(user);
        return mapToUserResponse(savedUser);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmailOrPhone(request.getEmail(), request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email/phone or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid email/phone or password");
        }

        String token = jwtUtils.generateToken(user.getEmail(), user.getUserId(), user.getRole().name());
        
        return AuthResponse.builder()
                .token(token)
                .user(mapToUserResponse(user))
                .build();
    }

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse updateProfile(Long userId, ProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setDistrict(request.getDistrict());
        user.setState(request.getState());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return mapToUserResponse(updatedUser);
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .district(user.getDistrict())
                .state(user.getState())
                .createdAt(user.getCreatedAt())
                .build();
    }

    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::mapToUserResponse);
    }

    public Page<UserResponse> getFarmersList(Pageable pageable) {
        return userRepository.findByRole(Role.FARMER, pageable)
                .map(this::mapToUserResponse);
    }

    public List<UserResponse> getAllFarmers() {
        return userRepository.findByRole(Role.FARMER).stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    public Map<String, Long> getUserCountsByRole() {
        Map<String, Long> counts = new HashMap<>();
        for (Role role : Role.values()) {
            counts.put(role.name(), userRepository.countByRole(role));
        }
        return counts;
    }
}
