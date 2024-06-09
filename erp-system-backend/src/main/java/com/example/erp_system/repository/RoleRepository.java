package com.example.erp_system.repository;

import com.example.erp_system.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // Método para encontrar um role pelo nome
    Role findByRoleName(String roleName);

}
