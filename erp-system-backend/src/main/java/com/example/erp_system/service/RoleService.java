package com.example.erp_system.service;

import com.example.erp_system.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    Role getRoleById(Long id);
    Role getRoleByName(String name);
    void saveRole(Role role);
    void deleteRole(Long id);
    Role updateRole(Role role);
}
