package com.example.erp_system.repository;

import com.example.erp_system.model.Role;
import com.example.erp_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Método para buscar todos os usuários por função (role)
    List<User> findAllByRoleId(int roleId);

    // Método para encontrar um usuário pelo email
    Optional<User> findByEmail(String email);
}
