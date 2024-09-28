package com.camino.camino_v1.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Document
@Data
@AllArgsConstructor
@Builder
public class RefreshToken {
    @Id
    private String id;

    private String token;

    private Instant expiryDate;

    private String username;
}
