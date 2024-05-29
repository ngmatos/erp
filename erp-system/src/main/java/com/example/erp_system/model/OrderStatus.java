package com.example.erp_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "OrderStatus")
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;

    // Getters and Setters
}