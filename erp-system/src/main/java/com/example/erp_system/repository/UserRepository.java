package com.example.erp_system.repository;

import com.example.erp_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}
