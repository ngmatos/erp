package com.example.erp_system.service;

import com.example.erp_system.model.User;

import java.util.List;

public interface EmployerService {
    List<User> getAllEmployers();
    User getEmployerById(int id);
    User createEmployer(User employer);
    User updateEmployer(int id, User employerDetails);
    void deleteEmployer(int id);
}
