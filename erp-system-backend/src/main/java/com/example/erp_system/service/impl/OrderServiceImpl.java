package com.example.erp_system.service.impl;

import com.example.erp_system.model.Order;
import com.example.erp_system.model.OrderStatus;
import com.example.erp_system.model.User;
import com.example.erp_system.repository.OrderRepository;
import com.example.erp_system.repository.OrderStatusRepository;
import com.example.erp_system.repository.UserRepository;
import com.example.erp_system.service.OrderService;
import com.example.erp_system.exception.CustomExceptions.OrderCreationException;
import com.example.erp_system.exception.CustomExceptions.OrderNotFoundException;
import com.example.erp_system.exception.CustomExceptions.OrderUpdateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrdersByStatus(String status) {
        Optional<OrderStatus> orderStatus = orderStatusRepository.findByStatus(status);
        if (orderStatus.isPresent()) {
            return orderRepository.findAllByOrderStatus(orderStatus.get());
        }
        return Collections.emptyList();
    }

    @Override
    public List<Order> getOrdersByCustomer(int customerId) {
        Optional<User> customer = userRepository.findById(customerId);
        if (customer.isPresent()) {
            return orderRepository.findAllByCustomer(customer.get());
        }
        return Collections.emptyList();
    }

    @Override
    public Order getOrderById(int id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id " + id));
    }

    @Override
    public Order createOrder(Order order) {
        try {
            Optional<User> optionalCustomer = userRepository.findById(order.getCustomer().getId());

            if (optionalCustomer.isPresent()) {
                order.setCustomer(optionalCustomer.get());
            } else {
                throw new OrderCreationException("Customer with id " + order.getCustomer().getId() + " not found.");
            }

            Optional<OrderStatus> orderStatus = orderStatusRepository.findById(order.getOrderStatus().getId());

            if (orderStatus.isPresent()) {
                order.setOrderStatus(orderStatus.get());
            } else {
                throw new OrderCreationException("Order status with id " + order.getOrderStatus().getId() + " not found.");
            }

            order.setOrderNo(generateOrderNo());
            order.setDateCreated(Date.from(Instant.now()));
            return orderRepository.save(order);
        } catch (Exception e) {
            throw new OrderCreationException("Failed to create order: " + e.getMessage());
        }
    }

    @Override
    public Order updateOrder(int id, Order orderDetails) {
        Optional<Order> optionalOrder = orderRepository.findById(id);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();

            // Atualiza o orderStatus se fornecido e diferente do existente
            if (orderDetails.getOrderStatus() != null) {
                Optional<OrderStatus> orderStatus = orderStatusRepository.findById(orderDetails.getOrderStatus().getId());

                if (orderStatus.isPresent()) {
                    order.setOrderStatus(orderStatus.get());
                } else {
                    throw new OrderUpdateException("Order status with id " + orderDetails.getOrderStatus().getId() + " not found.");
                }
            }

            // Atualiza a data do pedido se fornecida e diferente do existente
            if (orderDetails.getDateOrdered() != null) {
                order.setDateOrdered(orderDetails.getDateOrdered());
            }

            // Atualiza o customer se fornecido e diferente do existente
            if (orderDetails.getCustomer() != null) {
                Optional<User> optionalCustomer = userRepository.findById(orderDetails.getCustomer().getId());

                if (optionalCustomer.isPresent()) {
                    order.setCustomer(optionalCustomer.get());
                } else {
                    throw new OrderUpdateException("Customer with id " + orderDetails.getCustomer().getId() + " not found.");
                }
            }

            return orderRepository.save(order);
        } else {
            throw new OrderUpdateException("Order not found with id " + id);
        }
    }


    @Override
    public void deleteOrder(int id) {
        if (!orderRepository.existsById(id)) {
            throw new OrderNotFoundException("Order not found with id " + id);
        }
        orderRepository.deleteById(id);
    }

    @Override
    public Order updateStatus(int id, String status) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            Optional<OrderStatus> orderStatus = orderStatusRepository.findByStatus(status);
            if (orderStatus.isPresent()) {
                order.setOrderStatus(orderStatus.get());
                return orderRepository.save(order);
            } else {
                throw new IllegalArgumentException("Status '" + status + "' not found");
            }
        } else {
            throw new IllegalArgumentException("Order with id '" + id + "' not found");
        }
    }

    //Example: ORD0001 (ORD + id(4 digits))
    private String generateOrderNo() {
        String prefix = "ORD";
        // Get the max id from the database
        int maxId = orderRepository.findAll().stream().mapToInt(Order::getId).max().orElse(0);
        int nextId = maxId + 1;

        // Format the orderNo with leading zeros based on the nextId
        return String.format("%s%04d", prefix, nextId);
    }
}