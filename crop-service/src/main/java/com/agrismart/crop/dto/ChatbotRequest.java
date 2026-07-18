package com.agrismart.crop.dto;

import lombok.Data;
import java.util.List;

@Data
public class ChatbotRequest {
    private String message;
    private String language;
    private String farmerName;
    private String district;
    private String state;
    private String soilType;
    private List<String> activeCrops;
    private List<ChatMessageDto> history;
}
