package com.example.erp_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.erp_system.model.User;
import com.example.erp_system.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // Outros endpoints
}
