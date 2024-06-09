package com.example.erp_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "items")
public class Items {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    private String name;

    @Column(name = "category_id", nullable = false)
    private int categoryId;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    // Getters and Setters

    public Long getItemId() {
        return id;
    }

    public void setItemId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return name;
    }

    public void setItemName(String name) {
        this.name = name;
    }

    public int getCategoryId() { return categoryId; }

    public void setCategoryId(int category) {
            this.categoryId = category;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}
