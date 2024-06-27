package com.example.erp_system.controller.orders;

import com.example.erp_system.model.OrderStatus;
import com.example.erp_system.service.OrderStatusService;
import com.example.erp_system.exception.CustomExceptions.OrderStatusCreationException;
import com.example.erp_system.exception.CustomExceptions.OrderStatusNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/orders/status")
@RequiredArgsConstructor
public class OrdersStatusController {

    private final OrderStatusService orderStatusService;

    @GetMapping
    public ResponseEntity<List<OrderStatus>> getAllOrdersStatus() {
        List<OrderStatus> ordersStatus = orderStatusService.getAllOrdersStatus();
        return ResponseEntity.ok(ordersStatus);
    }

    @GetMapping("/{orderStatusId}")
    public ResponseEntity<OrderStatus> getOrderStatusById(@PathVariable int orderStatusId) {
        try {
            Optional<OrderStatus> orderStatus = orderStatusService.getOrderStatusById(orderStatusId);
            return ResponseEntity.ok(orderStatus.get());
        } catch (OrderStatusNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/name/{orderStatusName}")
    public ResponseEntity<OrderStatus> getOrderStatusByName(@PathVariable String orderStatusName) {
        try {
            Optional<OrderStatus> orderStatus = orderStatusService.getOrderStatusByName(orderStatusName);
            return ResponseEntity.ok(orderStatus.get());
        } catch (OrderStatusNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping
    public ResponseEntity<OrderStatus> createOrderStatus(@RequestBody OrderStatus orderStatusDetails) {
        try {
            OrderStatus createdOrderStatus = orderStatusService.createOrderStatus(orderStatusDetails);
            return ResponseEntity.ok(createdOrderStatus);
        } catch (OrderStatusCreationException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/{orderStatusId}")
    public ResponseEntity<OrderStatus> updateOrderStatus(@PathVariable int orderStatusId, @RequestBody OrderStatus orderStatusDetails) {
        try {
            Optional<OrderStatus> updatedOrderStatus = orderStatusService.updateOrderStatus(orderStatusId, orderStatusDetails);
            return ResponseEntity.ok(updatedOrderStatus.get());
        } catch (OrderStatusNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/{orderStatusId}")
    public ResponseEntity<Void> deleteOrderStatus(@PathVariable int orderStatusId) {
        try {
            orderStatusService.deleteOrderStatus(orderStatusId);
            return ResponseEntity.noContent().build();
        } catch (OrderStatusNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}