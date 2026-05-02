package com.nubbymedia.scmsp.dto;

import java.util.Set;

public record CurrentUserResponse(
        Long userId,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String accountStatus,
        Set<String> roles
) {
}
