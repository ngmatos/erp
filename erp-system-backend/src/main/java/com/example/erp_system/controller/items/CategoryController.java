package com.example.erp_system.controller.items;

import com.example.erp_system.model.Category;
import com.example.erp_system.repository.CategoryRepository;
import com.example.erp_system.service.CategoryService;
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
    private final CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/id/{categoryId}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int categoryId) {
        Optional<Category> category = categoryService.getCategoryById(categoryId);
        if (!category.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(category.get());
    }

    @GetMapping("/name/{categoryName}")
    public ResponseEntity<Category> getCategoryByName(@PathVariable String categoryName) {
        Optional<Category> category = categoryService.getCategoryByName(categoryName);
        if (!category.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(category.get());
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category categoryDetails) {
        Optional<Category> existingCategory = categoryRepository.findByCategoryName(categoryDetails.getCategoryName());
        if (existingCategory.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Category createdCategory = categoryService.createCategory(categoryDetails);
        if (createdCategory == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(createdCategory);
    }


    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable int categoryId, @RequestBody Category categoryDetails) {
        Optional<Category> category = categoryService.updateCategory(categoryId, categoryDetails);
        if (!category.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(category.get());
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok().build();
    }
}
