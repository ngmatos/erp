package com.example.erp_system.service;

import com.example.erp_system.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(int id);
    Optional<Category> getCategoryByName(String name);
    Category createCategory(Category category);
    Optional<Category> updateCategory(int id, Category categoryDetails);
    void deleteCategory(int id);
}
