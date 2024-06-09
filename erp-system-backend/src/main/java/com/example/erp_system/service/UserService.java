package com.example.erp_system.service;

import com.example.erp_system.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;


public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);
    User updateRoleUser(Long id, User userDetails);
}