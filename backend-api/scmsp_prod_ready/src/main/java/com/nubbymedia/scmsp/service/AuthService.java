package com.nubbymedia.scmsp.service;

import com.nubbymedia.scmsp.dto.AuthResponse;
import com.nubbymedia.scmsp.dto.LoginRequest;
import com.nubbymedia.scmsp.dto.RegisterRequest;
import com.nubbymedia.scmsp.entity.Role;
import com.nubbymedia.scmsp.entity.User;
import com.nubbymedia.scmsp.entity.UserRole;
import com.nubbymedia.scmsp.exception.BadRequestException;
import com.nubbymedia.scmsp.repository.RoleRepository;
import com.nubbymedia.scmsp.repository.UserRepository;
import com.nubbymedia.scmsp.repository.UserRoleRepository;
import com.nubbymedia.scmsp.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AuditService auditService;

    @Value("${app.security.allow-registration:true}")
    private boolean allowRegistration;

    public AuthResponse register(RegisterRequest request, String ipAddress, String userAgent) {
        if (!allowRegistration) {
            throw new BadRequestException("Registration is disabled");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already exists");
        }

        Role defaultRole = roleRepository.findByRoleName("Standard User")
                .orElseGet(() -> roleRepository.findByRoleName("Admin")
                        .orElseThrow(() -> new BadRequestException("No default role available")));

        User savedUser = userRepository.save(
                User.builder()
                        .firstName(request.firstName())
                        .lastName(request.lastName())
                        .email(request.email())
                        .phoneNumber(request.phoneNumber())
                        .passwordHash(passwordEncoder.encode(request.password()))
                        .accountStatus("Active")
                        .build()
        );

        userRoleRepository.save(
                UserRole.builder()
                        .user(savedUser)
                        .role(defaultRole)
                        .build()
        );

        User user = userRepository.findByEmail(savedUser.getEmail()).orElseThrow();
        auditService.log(user, null, "REGISTER", "User registered account", "SUCCESS", ipAddress, userAgent);
        return buildAuthResponse(user);
    }

    public AuthResponse login(LoginRequest request, String ipAddress, String userAgent) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        auditService.log(user, null, "LOGIN", "User logged in", "SUCCESS", ipAddress, userAgent);
        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        Set<String> roles = user.getUserRoles().stream()
                .map(userRole -> userRole.getRole().getRoleName())
                .collect(Collectors.toSet());
        String rolesCsv = String.join(",", roles);
        return new AuthResponse(
                jwtService.generateToken(user.getEmail(), rolesCsv),
                "Bearer",
                user.getUserId(),
                user.getEmail(),
                user.getFullName(),
                roles
        );
    }
}
