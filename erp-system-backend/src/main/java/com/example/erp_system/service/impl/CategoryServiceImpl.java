package com.example.erp_system.service.impl;

import com.example.erp_system.model.Category;
import com.example.erp_system.repository.CategoryRepository;
import com.example.erp_system.service.CategoryService;
import com.example.erp_system.exception.CustomExceptions.CategoryCreationException;
import com.example.erp_system.exception.CustomExceptions.CategoryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(int id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Optional<Category> getCategoryByName(String name) {
        return categoryRepository.findByCategoryName(name);
    }

    @Override
    public Category createCategory(Category category) {
        try {
            return categoryRepository.save(category);
        } catch (Exception e) {
            throw new CategoryCreationException("Failed to create category: " + e.getMessage());
        }
    }

    @Override
    public Optional<Category> updateCategory(int id, Category categoryDetails) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id " + id));

        category.setCategoryName(categoryDetails.getCategoryName());
        return Optional.of(categoryRepository.save(category));
    }

    @Override
    public void deleteCategory(int id) {
        if (!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException("Category not found with id " + id);
        }
        categoryRepository.deleteById(id);
    }
}
