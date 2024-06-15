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
    public List<Order> getOrdersByDateDay(String dateStr) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date;
        try {
            date = sdf.parse(dateStr);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format. Please use yyyy-MM-dd");
        }
        return orderRepository.findByDateOrdered(date);
    }

    @Override
    public List<Order> getOrdersByMonth(String monthStr) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        Date date;
        try {
            date = sdf.parse(monthStr);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid month format. Please use yyyy-MM");
        }

        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1; // Calendar.MONTH is zero-based

        return orderRepository.findByYearAndMonth(year, month);
    }

    @Override
    public Order getOrderById(int id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id " + id));
    }

    @Override
    public Order createOrder(Order order) {
        try {
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
            if(orderDetails.getOrderStatus() != null && !orderDetails.getOrderStatus().equals(order.getOrderStatus())) {
                order.setOrderStatus(orderDetails.getOrderStatus());
            }
            if(orderDetails.getDateOrdered() != null && !orderDetails.getDateOrdered().equals(order.getDateOrdered())) {
                order.setDateOrdered(orderDetails.getDateOrdered());
            }
            if(orderDetails.getCustomer() != null && !orderDetails.getCustomer().equals(order.getCustomer())) {
                order.setCustomer(orderDetails.getCustomer());
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

    private String generateOrderNo() {
        String lastOrderNo = orderRepository.findLastOrderNo();
        if (lastOrderNo == null) {
            return "ORD001";
        }

        int lastOrderNumber = Integer.parseInt(lastOrderNo.replace("ORD", ""));
        int nextOrderNumber = lastOrderNumber + 1;
        return String.format("ORD%03d", nextOrderNumber);
    }
}