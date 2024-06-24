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
        } else{
            existingUser.setPassword(existingUser.getPassword());
        }
        if(userDetails.getName() != null && !userDetails.getName().equals(existingUser.getName())) {
            existingUser.setName(userDetails.getName());
        } else{
            existingUser.setName(existingUser.getName());
        }
        if(userDetails.getEmail() != null && !userDetails.getEmail().equals(existingUser.getEmail())) {
            existingUser.setEmail(userDetails.getEmail());
        } else{
            existingUser.setEmail(existingUser.getEmail());
        }
        if(userDetails.getAddress() != null && !userDetails.getAddress().equals(existingUser.getAddress())) {
            existingUser.setAddress(userDetails.getAddress());
        } else{
            existingUser.setAddress(existingUser.getAddress());
        }
        if(userDetails.getRole() != null && userDetails.getRole().getId() != existingUser.getRole().getId()) {
            existingUser.setRole(userDetails.getRole());
        } else{
            existingUser.setRole(existingUser.getRole());
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
    public User updateRoleUser(int id, String role) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));

        if(roleRepository.findByRoleName(role) != null && roleRepository.findByRoleName(role).getId() != existingUser.getRole().getId()) {
            existingUser.setRole(roleRepository.findByRoleName(role));
        }
        return userRepository.save(existingUser);
    }

    @Override
    public User updatePassword(int id, String password, String oldPassword) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));

        if(passwordEncoder.matches(oldPassword, existingUser.getPassword())) {
            String encodedPassword = passwordEncoder.encode(password);
            existingUser.setPassword(encodedPassword);
        } else {
            throw new UserNotFoundException("Old password is incorrect");
        }
        return userRepository.save(existingUser);
    }
}
