package com.example.erp_system.service.impl;

import com.example.erp_system.model.OrderStatus;
import com.example.erp_system.repository.OrderStatusRepository;
import com.example.erp_system.service.OrderStatusService;
import com.example.erp_system.exception.CustomExceptions.OrderStatusCreationException;
import com.example.erp_system.exception.CustomExceptions.OrderStatusNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderStatusServiceImpl implements OrderStatusService {

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Override
    public List<OrderStatus> getAllOrdersStatus() {
        return orderStatusRepository.findAll();
    }

    @Override
    public Optional<OrderStatus> getOrderStatusById(int id) {
        return orderStatusRepository.findById(id);
    }

    @Override
    public Optional<OrderStatus> getOrderStatusByName(String name) {
        return orderStatusRepository.findByStatus(name);
    }

    @Override
    public OrderStatus createOrderStatus(OrderStatus orderStatus) {
        try {
            return orderStatusRepository.save(orderStatus);
        } catch (Exception e) {
            throw new OrderStatusCreationException("Failed to create order status: " + e.getMessage());
        }
    }

    @Override
    public Optional<OrderStatus> updateOrderStatus(int id, OrderStatus orderStatusDetails) {
        Optional<OrderStatus> orderStatus = orderStatusRepository.findById(id);
        if (orderStatus.isPresent()) {
            OrderStatus updatedOrderStatus = orderStatus.get();
            updatedOrderStatus.setStatus(orderStatusDetails.getStatus());
            return Optional.of(orderStatusRepository.save(updatedOrderStatus));
        }
        return Optional.empty();
    }

    @Override
    public void deleteOrderStatus(int id) {
        if (!orderStatusRepository.existsById(id)) {
            throw new OrderStatusNotFoundException("Order status not found with id " + id);
        }
        orderStatusRepository.deleteById(id);
    }
}
