package com.example.erp_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role_name;

    // Getters and Setters
}
