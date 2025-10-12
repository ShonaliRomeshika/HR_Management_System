package com.hdsr.hr.user.controller;

import com.hdsr.hr.user.model.AddUserRequestDTO;
import com.hdsr.hr.user.model.User;
import com.hdsr.hr.user.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public User addUser(@RequestBody AddUserRequestDTO request, @RequestHeader("X-User-Id") UUID currentUserId) {
        return userService.addUser(request.getName(), request.getEmail(), currentUserId);
    }
}
