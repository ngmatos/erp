package com.example.erp_system.repository;

import com.example.erp_system.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemsRepository extends JpaRepository<Items, Integer> {

    List<Items> findAllByCategoryId(int category_id);

    List<Items> findAllByStockQuantity(int stock_quantity);

    Optional<Items> findByName(String name);
}