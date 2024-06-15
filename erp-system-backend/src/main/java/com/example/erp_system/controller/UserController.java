package com.example.erp_system.controller;

import com.example.erp_system.model.User;
import com.example.erp_system.service.UserService;
import com.example.erp_system.exception.CustomExceptions.UserNotFoundException;
import com.example.erp_system.exception.CustomExceptions.UserCreationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/Admin")
    public ResponseEntity<List<User>> getAllAdmins() {
        List<User> users = userService.getAllAdmins();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        try {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/Admin/{userId}")
    public ResponseEntity<User> getAdminById(@PathVariable int userId) {
        try {
            User user = userService.getAdminById(userId);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (UserCreationException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable int userId, @Valid @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(userId, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/{userId}/role")
    public ResponseEntity<User> updateRoleUser(@PathVariable int userId, @Valid @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateRoleUser(userId, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(user);
    }

    @PutMapping("/current")
    public ResponseEntity<User> updateCurrentUser(@Valid @RequestBody User userDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        int userId = user.getId();
        try {
            User updatedUser = userService.updateUser(userId, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
