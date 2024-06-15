package com.example.erp_system.service.impl;

import com.example.erp_system.model.Role;
import com.example.erp_system.model.User;
import com.example.erp_system.repository.RoleRepository;
import com.example.erp_system.repository.UserRepository;
import com.example.erp_system.service.UserService;
import com.example.erp_system.exception.CustomExceptions.UserCreationException;
import com.example.erp_system.exception.CustomExceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getAllAdmins() {
        Role role = roleRepository.findByRoleName("ADMIN");
        return userRepository.findAllByRoleId(role.getId());
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
    }

    @Override
    public User getAdminById(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));

        if (!"ADMIN".equals(user.getRole().getRoleName())) {
            throw new UserNotFoundException("User with id " + id + " is not an admin");
        }

        return user;
    }

    @Override
    public User createUser(User user) {
        try {
            user.setRole(roleRepository.findByRoleName("USER"));
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            return userRepository.save(user);
        } catch (Exception e) {
            throw new UserCreationException("Failed to create user: " + e.getMessage());
        }
    }

    @Override
    public User updateUser(int id, User userDetails) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));

        if(userDetails.getPassword() != null && !userDetails.getPassword().equals(existingUser.getPassword())) {
            String encodedPassword = passwordEncoder.encode(userDetails.getPassword());
            existingUser.setPassword(encodedPassword);
        }
        if(userDetails.getName() != null && !userDetails.getName().equals(existingUser.getName())) {
            existingUser.setName(userDetails.getName());
        }
        if(userDetails.getEmail() != null && !userDetails.getEmail().equals(existingUser.getEmail())) {
            existingUser.setEmail(userDetails.getEmail());
        }
        if(userDetails.getAddress() != null && !userDetails.getAddress().equals(existingUser.getAddress())) {
            existingUser.setAddress(userDetails.getAddress());
        }
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(int id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public User updateRoleUser(int id, User userDetails) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));

        existingUser.setRole(userDetails.getRole());
        return userRepository.save(existingUser);
    }
}
