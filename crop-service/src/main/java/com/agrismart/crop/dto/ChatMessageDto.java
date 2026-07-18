package com.agrismart.crop.dto;

import lombok.Data;

@Data
public class ChatMessageDto {
    private String sender; // "user" or "bot"
    private String text;
}
