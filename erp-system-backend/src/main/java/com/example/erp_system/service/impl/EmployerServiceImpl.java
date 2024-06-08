package com.example.erp_system.service.impl;

import com.example.erp_system.model.Role;
import com.example.erp_system.model.User;
import com.example.erp_system.repository.UserRepository;
import com.example.erp_system.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class EmployerServiceImpl implements EmployerService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllEmployers() {
        return userRepository.findAllByRoleId(Role.EMPLOYER.getRoleId());
    }

    @Override
    public User getEmployerById(Long id) {
        Optional<User> optionalEmployer = userRepository.findById(id);
        return optionalEmployer.orElse(null);
    }

    @Override
    public User createEmployer(User employer) {
        employer.setRoleId(Role.EMPLOYER.getRoleId());
        return userRepository.save(employer);
    }

    @Override
    public User updateEmployer(Long id, User employerDetails) {
        Optional<User> optionalEmployer = userRepository.findById(id);
        if (optionalEmployer.isPresent()) {
            User existingEmployer = optionalEmployer.get();
            existingEmployer.setName(employerDetails.getName());
            existingEmployer.setEmail(employerDetails.getEmail());
            existingEmployer.setAddress(employerDetails.getAddress());
            return userRepository.save(existingEmployer);
        }
        return null;
    }

    @Override
    public void deleteEmployer(Long id) {
        userRepository.deleteById(id);
    }
}
