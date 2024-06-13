package com.example.erp_system.repository;

import com.example.erp_system.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    @Query("SELECT oi FROM OrderItem oi WHERE oi.item.name = :itemName")
    List<OrderItem> findByItemName(@Param("itemName") String itemName);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.id = :orderId")
    List<OrderItem> findByOrderId(@Param("orderId") int orderId);

    List<OrderItem> findAllByItemId(int itemId);

    List<OrderItem> findAllByQuantity(int quantity);
}
