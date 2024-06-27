package com.example.erp_system.service;

import com.example.erp_system.model.Items;

import java.util.List;

public interface ItemsService {
    List<Items> getAllItems();
    List<Items> getAllItemsByCategory(String category);
    List<Items> getAllItemsByStockQuantity(int stockQuantity);
    Items getItemById(int id);
    Items createItem(Items item);
    Items updateItem(int id, Items itemDetails);
    void deleteItem(int id);
    Items updateStockQuantity(int id, int stockQuantity);
    Items removeStockQuantity(int id, int stockQuantity);
}
