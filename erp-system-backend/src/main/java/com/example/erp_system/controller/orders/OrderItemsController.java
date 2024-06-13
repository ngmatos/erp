package com.example.erp_system.controller.orders;

import com.example.erp_system.model.OrderItem;
import com.example.erp_system.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderItems")
@RequiredArgsConstructor
public class OrderItemsController {

    private final OrderItemService orderItemService;

    @GetMapping
    public ResponseEntity<List<OrderItem>> getAllOrderItems() {
        try {
            List<OrderItem> orderItems = orderItemService.getAllOrderItems();
            return ResponseEntity.ok(orderItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/quantity/{quantity}")
    public ResponseEntity<List<OrderItem>> getOrderItemsByQuantity(@PathVariable int quantity) {
        try {
            List<OrderItem> orderItems = orderItemService.getOrderItemsByQuantity(quantity).orElse(null);
            if (orderItems == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(orderItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/itemName/{itemName}")
    public ResponseEntity<List<OrderItem>> getOrderItemsByItemName(@PathVariable String itemName) {
        try {
            List<OrderItem> orderItems = orderItemService.getOrderItemsByItemName(itemName).orElse(null);
            if (orderItems == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(orderItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/orderNo/{orderNo}")
    public ResponseEntity<List<OrderItem>> getOrderItemsByOrderNo(@PathVariable String orderNo) {
        try {
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderNo(orderNo).orElse(null);
            if (orderItems == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(orderItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable int id) {
        try {
            OrderItem orderItem = orderItemService.getOrderItemById(id).orElse(null);
            if (orderItem == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(orderItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItem orderItem) {
        try {
            OrderItem newOrderItem = orderItemService.createOrderItem(orderItem);
            return ResponseEntity.ok(newOrderItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderItem> updateOrderItem(@PathVariable int id, @RequestBody OrderItem orderItemDetails) {
        try {
            OrderItem updatedOrderItem = orderItemService.updateOrderItem(id, orderItemDetails).orElse(null);
            if (updatedOrderItem == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updatedOrderItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable int id) {
        try {
            orderItemService.deleteOrderItem(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/{quantity}")
    public ResponseEntity<OrderItem> updateQuantity(@PathVariable int id, @PathVariable int quantity) {
        try {
            OrderItem updatedOrderItem = orderItemService.updateQuantity(id, quantity).orElse(null);
            if (updatedOrderItem == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updatedOrderItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
