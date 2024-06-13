package com.example.erp_system.service;

import com.example.erp_system.model.OrderItem;

import java.util.List;
import java.util.Optional;

public interface OrderItemService {
    List<OrderItem> getAllOrderItems();
    Optional<List<OrderItem>> getOrderItemsByQuantity(int quantity);
    Optional<List<OrderItem>> getOrderItemsByItemName(String itemName);
    Optional<List<OrderItem>> getOrderItemsByOrderNo(String orderNo);
    Optional<OrderItem> getOrderItemById(int id);
    OrderItem createOrderItem(OrderItem orderItem);
    Optional<OrderItem> updateOrderItem(int id, OrderItem orderItemDetails);
    void deleteOrderItem(int id);
    Optional<OrderItem> updateQuantity(int id, int quantity);
}
