package com.example.erp_system.service.impl;

import com.example.erp_system.model.Category;
import com.example.erp_system.model.Items;
import com.example.erp_system.repository.CategoryRepository;
import com.example.erp_system.repository.ItemsRepository;
import com.example.erp_system.service.ItemsService;
import com.example.erp_system.exception.CustomExceptions.ItemsCreationException;
import com.example.erp_system.exception.CustomExceptions.ItemsNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ItemsServiceImpl implements ItemsService {

    @Autowired
    private ItemsRepository itemsRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Items> getAllItems() {
        return itemsRepository.findAll();
    }

    @Override
    public List<Items> getAllItemsByCategory(String categoryName) {
        Optional<Category> categoryOptional = categoryRepository.findByCategoryName(categoryName);

        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            int categoryId = category.getCategoryId();

            return itemsRepository.findAllByCategoryId(categoryId);
        }

        return Collections.emptyList();
    }

    @Override
    public List<Items> getAllItemsByStockQuantity(int stockQuantity) {
        return itemsRepository.findAllByStockQuantity(stockQuantity);
    }

    @Override
    public Items getItemById(int id) {
        return itemsRepository.findById(id)
                .orElseThrow(() -> new ItemsNotFoundException("Item not found with id " + id));
    }

    @Override
    public Items createItem(Items item) {
        try {
            return itemsRepository.save(item);
        } catch (Exception e) {
            throw new ItemsCreationException("Failed to create item: " + e.getMessage());
        }
    }

    @Override
    public Items updateItem(int id, Items itemDetails) {
        Items item = itemsRepository.findById(id)
                .orElseThrow(() -> new ItemsNotFoundException("Item not found with id " + id));

        if(itemDetails.getItemName() != null && !itemDetails.getItemName().equals(item.getItemName())) {
            item.setItemName(itemDetails.getItemName());
        }
        if(itemDetails.getCategory() != null && !itemDetails.getCategory().equals(item.getCategory())) {
            item.setCategory(itemDetails.getCategory());
        }
        if(itemDetails.getStockQuantity() != item.getStockQuantity()) {
            item.setStockQuantity(itemDetails.getStockQuantity());
        }
        return itemsRepository.save(item);
    }

    @Override
    public void deleteItem(int id) {
        if (!itemsRepository.existsById(id)) {
            throw new ItemsNotFoundException("Item not found with id " + id);
        }
        itemsRepository.deleteById(id);
    }

    @Override
    public Items updateStockQuantity(int id, int stockQuantity) {
        Items item = itemsRepository.findById(id)
                .orElseThrow(() -> new ItemsNotFoundException("Item not found with id " + id));

        if(stockQuantity < 0) {
            throw new IllegalArgumentException("Stock quantity cannot be negative");
        }
        if (stockQuantity == item.getStockQuantity()) {
            return item;
        }
        return itemsRepository.save(item);
    }
}
