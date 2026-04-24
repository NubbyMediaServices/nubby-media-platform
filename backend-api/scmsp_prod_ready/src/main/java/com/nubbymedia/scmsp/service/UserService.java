package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.dto.CurrentUserResponse;
import com.nubbymedia.scmsp.entity.User;
import com.nubbymedia.scmsp.exception.ResourceNotFoundException;
import com.nubbymedia.scmsp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public CurrentUserResponse getCurrentUser(String email) {
        User user = getByEmail(email);
        Set<String> roles = user.getUserRoles().stream()
                .map(userRole -> userRole.getRole().getRoleName())
                .collect(Collectors.toSet());

        return new CurrentUserResponse(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAccountStatus(),
                roles
        );
    }
}
