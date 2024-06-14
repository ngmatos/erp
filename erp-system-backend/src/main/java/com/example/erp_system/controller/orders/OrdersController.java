package com.example.erp_system.controller.orders;

import com.example.erp_system.model.Order;
import com.example.erp_system.service.OrderService;
import com.example.erp_system.exception.CustomExceptions.OrderCreationException;
import com.example.erp_system.exception.CustomExceptions.OrderNotFoundException;
import com.example.erp_system.exception.CustomExceptions.OrderUpdateException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrdersController {

    @Autowired
    private OrderService ordersService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = ordersService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/statusName/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable String status) {
        try {
            List<Order> orders = ordersService.getOrdersByStatus(status);
            if (orders.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(orders);
        } catch (OrderNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Order>> getOrdersByCustomer(@PathVariable int customerId) {
        try {
            List<Order> orders = ordersService.getOrdersByCustomer(customerId);
            if (orders.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(orders);
        } catch (OrderNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Order>> getOrdersByDateDay(@PathVariable String date) {
        try {
            List<Order> orders = ordersService.getOrdersByDateDay(date);
            if (orders.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(orders);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/month/{month}")
    public ResponseEntity<List<Order>> getOrdersByMonth(@PathVariable String month) {
        try {
            List<Order> orders = ordersService.getOrdersByMonth(month);
            if (orders.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(orders);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable int orderId) {
        try {
            Order order = ordersService.getOrderById(orderId);
            return ResponseEntity.ok(order);
        } catch (OrderNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order orderDetails) {
        try {
            Order createdOrder = ordersService.createOrder(orderDetails);
            return ResponseEntity.ok(createdOrder);
        } catch (OrderCreationException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable int orderId, @RequestBody Order orderDetails) {
        try {
            Order updatedOrder = ordersService.updateOrder(orderId, orderDetails);
            return ResponseEntity.ok(updatedOrder);
        } catch (OrderUpdateException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderId) {
        try {
            ordersService.deleteOrder(orderId);
            return ResponseEntity.noContent().build();
        } catch (OrderNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{orderId}/{status}")
    public ResponseEntity<Order> updateStatus(@PathVariable int orderId, @PathVariable String status) {
        try {
            Order updatedOrder = ordersService.updateStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (OrderNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
