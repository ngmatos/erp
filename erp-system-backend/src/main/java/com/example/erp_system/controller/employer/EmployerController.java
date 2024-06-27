package com.example.erp_system.controller.employer;

import com.example.erp_system.model.User;
import com.example.erp_system.service.EmployerService;
import com.example.erp_system.exception.CustomExceptions.EmployerNotFoundException;
import com.example.erp_system.exception.CustomExceptions.EmployerCreationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/employers")
@RequiredArgsConstructor
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @GetMapping
    public ResponseEntity<List<User>> getAllEmployers() {
        List<User> employers = employerService.getAllEmployers();
        return ResponseEntity.ok(employers);
    }

    @GetMapping("/{employerId}")
    public ResponseEntity<User> getEmployerById(@PathVariable int employerId) {
        try {
            User employer = employerService.getEmployerById(employerId);
            return ResponseEntity.ok(employer);
        } catch (EmployerNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping
    public ResponseEntity<User> createEmployer(@RequestBody User employer) {
        try {
            User createdEmployer = employerService.createEmployer(employer);
            return new ResponseEntity<>(createdEmployer, HttpStatus.CREATED);
        } catch (EmployerCreationException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/{employerId}")
    public ResponseEntity<User> updateEmployer(@PathVariable int employerId, @RequestBody User employerDetails) {
        try {
            User updatedEmployer = employerService.updateEmployer(employerId, employerDetails);
            return ResponseEntity.ok(updatedEmployer);
        } catch (EmployerNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/{employerId}")
    public ResponseEntity<Void> deleteEmployer(@PathVariable int employerId) {
        try {
            employerService.deleteEmployer(employerId);
            return ResponseEntity.noContent().build();
        } catch (EmployerNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}