package com.example.erp_system.model;

import jakarta.persistence.Table;

@Table(name = "role")
public enum Role {
    USER(1),
    ADMIN(2),
    EMPLOYER(3),
    CLIENT(4);

    private final int roleId;

    Role(int roleId) {
        this.roleId = roleId;
    }

    public int getRoleId() {
        return roleId;
    }
}
