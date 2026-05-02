package com.nubbymedia.scmsp.security;

import com.nubbymedia.scmsp.entity.User;
import com.nubbymedia.scmsp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                user.getUserRoles().stream()
                        .map(userRole -> "ROLE_" + userRole.getRole().getRoleName().toUpperCase().replace(" ", "_"))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toSet())
        );
    }
}
