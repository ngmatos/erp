package com.example.erp_system.service;

import com.example.erp_system.model.Order;

import java.util.Date;
import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();
    List<Order> getOrdersByStatus(String status);
    List<Order> getOrdersByCustomer(int customerId);
    List<Order> getOrdersByDateDay(String date);
    List<Order> getOrdersByMonth(String monthStr);
    Order getOrderById(int id);
    Order createOrder(Order order);
    Order updateOrder(int id, Order orderDetails);
    void deleteOrder(int id);
    Order updateStatus(int id, String status);
}
