package com.agrismart.user.dto;

import com.agrismart.user.entity.Role;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private String district;
    private String state;
    private LocalDateTime createdAt;
}
