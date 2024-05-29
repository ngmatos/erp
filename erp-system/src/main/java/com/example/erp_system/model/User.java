package com.example.erp_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String address;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    // Getters and Setters
}
