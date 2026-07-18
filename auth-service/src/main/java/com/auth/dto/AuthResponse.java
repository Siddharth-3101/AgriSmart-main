package com.auth.dto;

public class AuthResponse {

    private String token;
    private String tokenType = "Bearer";
    private UserDto user;

    public AuthResponse(String token, Long userId, String name, String email, String phone, String role, String district, String state) {
        this.token = token;
        this.user = new UserDto(userId, name, email, phone, role, district, state);
    }

    public String getToken() { return token; }
    public String getTokenType() { return tokenType; }
    public UserDto getUser() { return user; }

    public static class UserDto {
        private Long userId;
        private String name;
        private String email;
        private String phone;
        private String role;
        private String district;
        private String state;

        public UserDto(Long userId, String name, String email, String phone, String role, String district, String state) {
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.role = role;
            this.district = district;
            this.state = state;
        }

        public Long getUserId() { return userId; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public String getPhone() { return phone; }
        public String getRole() { return role; }
        public String getDistrict() { return district; }
        public String getState() { return state; }
    }
}
