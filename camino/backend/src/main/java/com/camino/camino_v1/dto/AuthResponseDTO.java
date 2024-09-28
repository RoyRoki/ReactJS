package com.camino.camino_v1.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDTO {
    private String accessToken;
    private String refreshToken;
}
