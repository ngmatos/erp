package com.example.erp_system.service;

import com.example.erp_system.model.OrderStatus;

import java.util.List;
import java.util.Optional;

public interface OrderStatusService {
    List<OrderStatus> getAllOrdersStatus();
    Optional<OrderStatus> getOrderStatusById(int id);
    Optional<OrderStatus> getOrderStatusByName(String name);
    OrderStatus createOrderStatus(OrderStatus orderStatus);
    Optional<OrderStatus> updateOrderStatus(int id, OrderStatus orderStatusDetails);
    void deleteOrderStatus(int id);
}
