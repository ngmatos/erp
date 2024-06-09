package com.example.erp_system.controller.employer;

import com.example.erp_system.model.User;
import com.example.erp_system.service.EmployerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<User> getEmployerById(@PathVariable Long employerId) {
        User employer = employerService.getEmployerById(employerId);
        if (employer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employer);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping
    public ResponseEntity<User> createEmployer(@RequestBody User employer) {
        User createdEmployer = employerService.createEmployer(employer);
        return new ResponseEntity<>(createdEmployer, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/{employerId}")
    public ResponseEntity<User> updateEmployer(@PathVariable Long employerId, @RequestBody User employerDetails) {
        User updatedEmployer = employerService.updateEmployer(employerId, employerDetails);
        if (updatedEmployer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedEmployer);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/{employerId}")
    public ResponseEntity<Void> deleteEmployer(@PathVariable Long employerId) {
        employerService.deleteEmployer(employerId);
        return ResponseEntity.noContent().build();
    }
}
