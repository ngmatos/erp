package com.example.erp_system.service.impl;

import com.example.erp_system.model.Role;
import com.example.erp_system.model.User;
import com.example.erp_system.repository.RoleRepository;
import com.example.erp_system.repository.UserRepository;
import com.example.erp_system.service.EmployerService;
import com.example.erp_system.exception.CustomExceptions.EmployerCreationException;
import com.example.erp_system.exception.CustomExceptions.EmployerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class EmployerServiceImpl implements EmployerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllEmployers() {
        return userRepository.findAllByRoleId(roleRepository.findByRoleName("EMPLOYER").getId());
    }

    @Override
    public User getEmployerById(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EmployerNotFoundException("Employer not found with id " + id));

        if (!"EMPLOYER".equals(user.getRole().getRoleName())) {
            throw new EmployerNotFoundException("User with id " + id + " is not an employer");
        }

        return user;
    }

    @Override
    public User createEmployer(User employer) {
        try {
            employer.setRole(roleRepository.findByRoleName("EMPLOYER"));
            String encodedPassword = passwordEncoder.encode(employer.getPassword());
            employer.setPassword(encodedPassword);
            return userRepository.save(employer);
        } catch (Exception e) {
            throw new EmployerCreationException("Failed to create employer: " + e.getMessage());
        }
    }

    @Override
    public User updateEmployer(int id, User employerDetails) {
        User existingEmployer = userRepository.findById(id)
                .orElseThrow(() -> new EmployerNotFoundException("Employer not found with id " + id));

        if (employerDetails.getName() != null && !employerDetails.getName().equals(existingEmployer.getName())) {
            existingEmployer.setName(employerDetails.getName());
        } else {
            existingEmployer.setName(existingEmployer.getName());
        }

        if (employerDetails.getEmail() != null && !employerDetails.getEmail().equals(existingEmployer.getEmail())) {
            existingEmployer.setEmail(employerDetails.getEmail());
        } else{
            existingEmployer.setEmail(existingEmployer.getEmail());
        }

        if (employerDetails.getAddress() != null && !employerDetails.getAddress().equals(existingEmployer.getAddress())) {
            existingEmployer.setAddress(employerDetails.getAddress());
        } else{
            existingEmployer.setAddress(existingEmployer.getAddress());
        }

        if (employerDetails.getPassword() != null && !employerDetails.getPassword().equals(existingEmployer.getPassword())) {
            String encodedPassword = passwordEncoder.encode(employerDetails.getPassword());
            existingEmployer.setPassword(encodedPassword);
        } else{
            existingEmployer.setPassword(existingEmployer.getPassword());
        }

        return userRepository.save(existingEmployer);
    }

    @Override
    public void deleteEmployer(int id) {
        if (!userRepository.existsById(id)) {
            throw new EmployerNotFoundException("Employer not found with id " + id);
        }
        userRepository.deleteById(id);
    }
}
