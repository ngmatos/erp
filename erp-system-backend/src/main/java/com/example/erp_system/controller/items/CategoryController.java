package com.example.erp_system.controller.items;

import com.example.erp_system.model.Category;
import com.example.erp_system.repository.CategoryRepository;
import com.example.erp_system.service.CategoryService;
import com.example.erp_system.exception.CustomExceptions.CategoryCreationException;
import com.example.erp_system.exception.CustomExceptions.CategoryNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/id/{categoryId}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int categoryId) {
        try {
            Category category = categoryService.getCategoryById(categoryId)
                    .orElseThrow(() -> new CategoryNotFoundException("Category not found with id " + categoryId));
            return ResponseEntity.ok(category);
        } catch (CategoryNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/name/{categoryName}")
    public ResponseEntity<Category> getCategoryByName(@PathVariable String categoryName) {
        try {
            Category category = categoryService.getCategoryByName(categoryName)
                    .orElseThrow(() -> new CategoryNotFoundException("Category not found with name " + categoryName));
            return ResponseEntity.ok(category);
        } catch (CategoryNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category categoryDetails) {
        try {
            Category createdCategory = categoryService.createCategory(categoryDetails);
            return ResponseEntity.ok(createdCategory);
        } catch (CategoryCreationException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable int categoryId, @RequestBody Category categoryDetails) {
        try {
            Category updatedCategory = categoryService.updateCategory(categoryId, categoryDetails)
                    .orElseThrow(() -> new CategoryNotFoundException("Category not found with id " + categoryId));
            return ResponseEntity.ok(updatedCategory);
        } catch (CategoryNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int categoryId) {
        try {
            categoryService.deleteCategory(categoryId);
            return ResponseEntity.noContent().build();
        } catch (CategoryNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}