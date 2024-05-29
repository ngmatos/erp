package com.example.erp_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category_name;

    // Getters and Setters
}