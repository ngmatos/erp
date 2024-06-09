package com.example.erp_system.service.impl;

import com.example.erp_system.model.Role;
import com.example.erp_system.repository.RoleRepository;
import com.example.erp_system.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    @Override
    public Role getRoleByName(String name) {
        return roleRepository.findByRoleName(name);
    }

    @Override
    public void saveRole(Role role) {
        roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public Role updateRole(Role role) {
        return roleRepository.save(role);
    }

}
