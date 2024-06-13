package com.example.erp_system.controller.orders;

import com.example.erp_system.model.Order;
import com.example.erp_system.service.OrderService;
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
        List<Order> orders = ordersService.getOrdersByStatus(status);
        if (orders.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Order>> getOrdersByCustomer(@PathVariable int customerId) {
        List<Order> orders = ordersService.getOrdersByCustomer(customerId);
        if (orders.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Order>> getOrdersByDateDay(@PathVariable String date) {
        List<Order> orders = ordersService.getOrdersByDateDay(date);
        if (orders.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/month/{month}")
    public ResponseEntity<List<Order>> getOrdersByMonth(@PathVariable String month) {
        List<Order> orders = ordersService.getOrdersByMonth(month);
        if (orders.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable int orderId) {
        Order order = ordersService.getOrderById(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order orderDetails) {
        Order createdOrder = ordersService.createOrder(orderDetails);
        return ResponseEntity.ok(createdOrder);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable int orderId, @RequestBody Order orderDetails) {
        Order updatedOrder = ordersService.updateOrder(orderId, orderDetails);
        if (updatedOrder == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderId) {
        ordersService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{orderId}/{status}")
    public ResponseEntity<Order> updateStatus(@PathVariable int orderId, @PathVariable String status) {
        Order updatedOrder = ordersService.updateStatus(orderId, status);
        if (updatedOrder == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedOrder);
    }
}
