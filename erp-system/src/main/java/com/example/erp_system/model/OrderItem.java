package com.example.erp_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "OrderItem")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Items item;

    private int quantity;

    // Getters and Setters
}