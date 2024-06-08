package com.example.erp_system.repository;

import com.example.erp_system.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemsRepository extends JpaRepository<Items, Long> {}