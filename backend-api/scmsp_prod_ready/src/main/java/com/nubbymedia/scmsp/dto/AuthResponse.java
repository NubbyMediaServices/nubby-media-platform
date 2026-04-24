package com.nubbymedia.scmsp.dto;

import java.util.Set;

public record AuthResponse(
        String token,
        String tokenType,
        Long userId,
        String email,
        String fullName,
        Set<String> roles
) {
}
