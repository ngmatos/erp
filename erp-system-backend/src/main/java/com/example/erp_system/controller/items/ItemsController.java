package com.example.erp_system.controller.items;

import com.example.erp_system.model.Items;
import com.example.erp_system.service.ItemsService;
import com.example.erp_system.exception.CustomExceptions.ItemsCreationException;
import com.example.erp_system.exception.CustomExceptions.ItemsNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemsController {

    private final ItemsService itemsService;

    @GetMapping
    public ResponseEntity<List<Items>> getAllItems() {
        List<Items> items = itemsService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<Items> getItemById(@PathVariable int itemId) {
        try {
            Items item = itemsService.getItemById(itemId);
            return ResponseEntity.ok(item);
        } catch (ItemsNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Items>> getItemsByCategory(@PathVariable String category) {
        try {
            category = category.toUpperCase();
            List<Items> items = itemsService.getAllItemsByCategory(category);
            return ResponseEntity.ok(items);
        } catch (ItemsNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/stockQuantity/{stockQuantity}")
    public ResponseEntity<List<Items>> getItemsByStockQuantity(@PathVariable int stockQuantity) {
        List<Items> items = itemsService.getAllItemsByStockQuantity(stockQuantity);
        return ResponseEntity.ok(items);
    }

    @PutMapping("/stockQuantity/{itemId}/{stockQuantity}")
    public ResponseEntity<Items> updateStockQuantity(@PathVariable int itemId, @PathVariable int stockQuantity) {
        try {
            Items item = itemsService.updateStockQuantity(itemId, stockQuantity);
            return ResponseEntity.ok(item);
        } catch (ItemsNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Items> createItem(@RequestBody Items itemsDetails) {
        try {
            Items createdItem = itemsService.createItem(itemsDetails);
            return ResponseEntity.ok(createdItem);
        } catch (ItemsCreationException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Items> updateItem(@PathVariable int itemId, @RequestBody Items itemsDetails) {
        try {
            Items updatedItem = itemsService.updateItem(itemId, itemsDetails);
            return ResponseEntity.ok(updatedItem);
        } catch (ItemsNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable int itemId) {
        try {
            itemsService.deleteItem(itemId);
            return ResponseEntity.noContent().build();
        } catch (ItemsNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}