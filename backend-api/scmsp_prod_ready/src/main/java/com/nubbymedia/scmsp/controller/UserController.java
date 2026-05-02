package com.nubbymedia.scmsp.controller;

import com.nubbymedia.scmsp.dto.CurrentUserResponse;
import com.nubbymedia.scmsp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public CurrentUserResponse me(Authentication authentication) {
        return userService.getCurrentUser(authentication.getName());
    }
}
