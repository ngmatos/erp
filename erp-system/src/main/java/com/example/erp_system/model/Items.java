package com.example.erp_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Items")
public class Items {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private int stockQuantity;

    // Getters and Setters
}