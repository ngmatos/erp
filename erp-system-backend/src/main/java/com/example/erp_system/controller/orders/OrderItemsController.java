package com.example.erp_system.controller.orders;

import com.example.erp_system.model.OrderItem;
import com.example.erp_system.service.OrderItemService;
import com.example.erp_system.exception.CustomExceptions.OrderItemNotFoundException;
import com.example.erp_system.exception.CustomExceptions.OrderItemCreationException;
import com.example.erp_system.exception.CustomExceptions.OrderItemUpdateException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
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
            Optional<List<OrderItem>> orderItems = orderItemService.getOrderItemsByQuantity(quantity);
            if (orderItems.isPresent() && !orderItems.get().isEmpty()) {
                return ResponseEntity.ok(orderItems.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (OrderItemNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/itemName/{itemName}")
    public ResponseEntity<List<OrderItem>> getOrderItemsByItemName(@PathVariable String itemName) {
        try {
            Optional<List<OrderItem>> orderItems = orderItemService.getOrderItemsByItemName(itemName);
            if (orderItems.isPresent() && !orderItems.get().isEmpty()) {
                return ResponseEntity.ok(orderItems.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (OrderItemNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/orderNo/{orderNo}")
    public ResponseEntity<List<OrderItem>> getOrderItemsByOrderNo(@PathVariable String orderNo) {
        try {
            Optional<List<OrderItem>> orderItems = orderItemService.getOrderItemsByOrderNo(orderNo);
            if (orderItems.isPresent() && !orderItems.get().isEmpty()) {
                return ResponseEntity.ok(orderItems.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (OrderItemNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable int id) {
        try {
            Optional<OrderItem> orderItem = orderItemService.getOrderItemById(id);
            if (orderItem.isPresent()) {
                return ResponseEntity.ok(orderItem.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (OrderItemNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    @PostMapping
    public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItem orderItem) {
        try {
            OrderItem newOrderItem = orderItemService.createOrderItem(orderItem);
            return ResponseEntity.ok(newOrderItem);
        } catch (OrderItemCreationException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    @PutMapping("/{id}")
    public ResponseEntity<OrderItem> updateOrderItem(@PathVariable int id, @RequestBody OrderItem orderItemDetails) {
        try {
            Optional<OrderItem> updatedOrderItem = orderItemService.updateOrderItem(id, orderItemDetails);
            if (updatedOrderItem.isPresent()) {
                return ResponseEntity.ok(updatedOrderItem.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (OrderItemUpdateException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable int id) {
        try {
            orderItemService.deleteOrderItem(id);
            return ResponseEntity.noContent().build();
        } catch (OrderItemNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    @PutMapping("/{id}/{quantity}")
    public ResponseEntity<OrderItem> updateQuantity(@PathVariable int id, @PathVariable int quantity) {
        try {
            Optional<OrderItem> updatedOrderItem = orderItemService.updateQuantity(id, quantity);
            if (updatedOrderItem.isPresent()) {
                return ResponseEntity.ok(updatedOrderItem.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (OrderItemUpdateException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
