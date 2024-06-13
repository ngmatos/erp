package com.example.erp_system.service;

import com.example.erp_system.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    Role getRoleById(int id);
    Role getRoleByName(String name);
    void saveRole(Role role);
    void deleteRole(int id);
    Role updateRole(Role role);
}
