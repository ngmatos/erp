package com.example.erp_system.controller.orders;

import com.example.erp_system.model.OrderStatus;
import com.example.erp_system.service.OrderStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders/status")
@RequiredArgsConstructor
public class OrdersStatusController {

    @Autowired
    private OrderStatusService ordersStatusService;

    @GetMapping
    public ResponseEntity<List<OrderStatus>> getAllOrdersStatus() {
        List<OrderStatus> ordersStatus = ordersStatusService.getAllOrdersStatus();
        return ResponseEntity.ok(ordersStatus);
    }

    @GetMapping("/{orderStatusId}")
    public ResponseEntity<OrderStatus> getOrderStatusById(@PathVariable int orderStatusId) {
        Optional<OrderStatus> orderStatus = ordersStatusService.getOrderStatusById(orderStatusId);
        if (orderStatus.isPresent()) {
            return ResponseEntity.ok(orderStatus.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/name/{orderStatusName}")
    public ResponseEntity<OrderStatus> getOrderStatusByName(@PathVariable String orderStatusName) {
        Optional<OrderStatus> orderStatus = ordersStatusService.getOrderStatusByName(orderStatusName);
        if (orderStatus.isPresent()) {
            return ResponseEntity.ok(orderStatus.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<OrderStatus> createOrderStatus(@RequestBody OrderStatus orderStatusDetails) {
        OrderStatus createdOrderStatus = ordersStatusService.createOrderStatus(orderStatusDetails);
        return ResponseEntity.ok(createdOrderStatus);
    }

    @PutMapping("/{orderStatusId}")
    public ResponseEntity<OrderStatus> updateOrderStatus(@PathVariable int orderStatusId, @RequestBody OrderStatus orderStatusDetails) {
        Optional<OrderStatus> updatedOrderStatus = ordersStatusService.updateOrderStatus(orderStatusId, orderStatusDetails);
        if (updatedOrderStatus.isPresent()) {
            return ResponseEntity.ok(updatedOrderStatus.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{orderStatusId}")
    public ResponseEntity<Void> deleteOrderStatus(@PathVariable int orderStatusId) {
        ordersStatusService.deleteOrderStatus(orderStatusId);
        return ResponseEntity.noContent().build();
    }
}
