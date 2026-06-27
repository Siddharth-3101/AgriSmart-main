package com.agrismart.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestBCrypt {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "password";
        String encoded = encoder.encode(rawPassword);
        System.out.println("=========================================");
        System.out.println("Generated BCrypt Hash for 'password':");
        System.out.println(encoded);
        System.out.println("Matches generated: " + encoder.matches(rawPassword, encoded));
        System.out.println("=========================================");
    }
}
