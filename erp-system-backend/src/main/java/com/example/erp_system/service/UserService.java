package com.example.erp_system.service;

import com.example.erp_system.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;


public interface UserService {
    List<User> getAllUsers();
    User getUserById(int id);
    User createUser(User user);
    User updateUser(int id, User userDetails);
    void deleteUser(int id);
    User updateRoleUser(int id, User userDetails);
}