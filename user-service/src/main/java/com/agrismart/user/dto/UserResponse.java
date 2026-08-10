package com.agrismart.user.dto;

import com.agrismart.user.entity.Role;
import java.time.LocalDateTime;

public class UserResponse {
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private String district;
    private String state;
    private LocalDateTime createdAt;

    public UserResponse() {
    }

    public UserResponse(Long userId, String name, String email, String phone, Role role, String district, String state, LocalDateTime createdAt) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.district = district;
        this.state = state;
        this.createdAt = createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static UserResponseBuilder builder() {
        return new UserResponseBuilder();
    }

    public static class UserResponseBuilder {
        private Long userId;
        private String name;
        private String email;
        private String phone;
        private Role role;
        private String district;
        private String state;
        private LocalDateTime createdAt;

        public UserResponseBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public UserResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserResponseBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public UserResponseBuilder role(Role role) {
            this.role = role;
            return this;
        }

        public UserResponseBuilder district(String district) {
            this.district = district;
            return this;
        }

        public UserResponseBuilder state(String state) {
            this.state = state;
            return this;
        }

        public UserResponseBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public UserResponse build() {
            return new UserResponse(userId, name, email, phone, role, district, state, createdAt);
        }
    }
}

