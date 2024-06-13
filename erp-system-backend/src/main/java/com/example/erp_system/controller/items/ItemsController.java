package com.example.erp_system.controller.items;

import com.example.erp_system.model.Items;
import com.example.erp_system.service.ItemsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemsController {

    @Autowired
    private ItemsService itemsService;

    @GetMapping
    public ResponseEntity<List<Items>> getAllItems() {
        List<Items> items = itemsService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<Items> getItemById(@PathVariable int itemId) {
        Items item = itemsService.getItemById(itemId);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(item);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Items>> getItemsByCategory(@PathVariable String category) {
        category = category.toUpperCase();
        List<Items> items = itemsService.getAllItemsByCategory(category);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/stockQuantity/{stockQuantity}")
    public ResponseEntity<List<Items>> getItemsByStockQuantity(@PathVariable int stockQuantity) {
        List<Items> items = itemsService.getAllItemsByStockQuantity(stockQuantity);
        return ResponseEntity.ok(items);
    }

    @PutMapping("/stockQuantity/{itemId}/{stockQuantity}")
    public ResponseEntity<Items> updateStockQuantity(@PathVariable int itemId, @PathVariable int stockQuantity) {
        Items item = itemsService.updateStockQuantity(itemId, stockQuantity);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(item);
    }

    @PostMapping
    public ResponseEntity<Items> createItem(@RequestBody Items itemsDetails) {
        Items createdItem = itemsService.createItem(itemsDetails);
        return ResponseEntity.ok(createdItem);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Items> updateItem(@PathVariable int itemId, @RequestBody Items itemsDetails) {
        Items updatedItem = itemsService.updateItem(itemId, itemsDetails);
        if (updatedItem == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable int itemId) {
        itemsService.deleteItem(itemId);
        return ResponseEntity.noContent().build();
    }

}
