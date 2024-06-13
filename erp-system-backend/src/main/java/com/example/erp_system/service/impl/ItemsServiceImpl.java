package com.example.erp_system.service.impl;

import com.example.erp_system.model.Category;
import com.example.erp_system.model.Items;
import com.example.erp_system.repository.CategoryRepository;
import com.example.erp_system.repository.ItemsRepository;
import com.example.erp_system.service.ItemsService;
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
        return itemsRepository.findById(id).orElse(null);
    }

    @Override
    public Items createItem(Items item) {
        return itemsRepository.save(item);
    }

    @Override
    public Items updateItem(int id, Items itemDetails) {
        Items item = itemsRepository.findById(id).orElse(null);
        if (item != null) {
            item.setItemName(itemDetails.getItemName());
            item.setCategory(itemDetails.getCategory());
            item.setStockQuantity(itemDetails.getStockQuantity());
            return itemsRepository.save(item);
        }
        return null;
    }

    @Override
    public void deleteItem(int id) {
        itemsRepository.deleteById(id);
    }

    @Override
    public Items updateStockQuantity(int id, int stockQuantity) {
        Items item = itemsRepository.findById(id).orElse(null);
        if (item != null) {
            item.setStockQuantity(stockQuantity);
            return itemsRepository.save(item);
        }
        return null;
    }
}
