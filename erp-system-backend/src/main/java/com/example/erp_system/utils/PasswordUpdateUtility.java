package com.example.erp_system.utils;

import com.example.erp_system.model.Category;
import com.example.erp_system.model.Items;
import com.example.erp_system.model.Role;
import com.example.erp_system.model.User;
import com.example.erp_system.repository.CategoryRepository;
import com.example.erp_system.repository.UserRepository;
import com.example.erp_system.service.CategoryService;
import com.example.erp_system.service.ItemsService;
import com.example.erp_system.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PasswordUpdateUtility {

    private static final Logger logger = LoggerFactory.getLogger(PasswordUpdateUtility.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void updatePasswords() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (!user.getPassword().startsWith("$2a$") && !user.getPassword().startsWith("$2b$")) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepository.save(user);
            }
        }
    }

    private final ItemsService itemsService;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;

    @PostConstruct
    public void addItemTest() {
        Optional<Category> existingCategory = categoryRepository.findByCategoryName("TEST");
        if (existingCategory.isEmpty()) {
            Category categoryTest = new Category();
            categoryTest.setCategoryName("TEST");
            categoryService.createCategory(categoryTest);
        }

        Category testCategory = categoryRepository.findByCategoryName("TEST")
                .orElseThrow(() -> new RuntimeException("Categoria 'TEST' não encontrada"));

        Items itemTest = new Items();
        itemTest.setItemName("TEST ITEM");
        itemTest.setCategory(testCategory);

        itemTest.setStockQuantity(100);

        // Cria o item no serviço de itens
        itemsService.createItem(itemTest);
    }

    @PostConstruct
    public void addCategoryTest() {
        if(categoryRepository.findByCategoryName("TEST2").isEmpty()) {
            Category categoryTest = new Category();
            categoryTest.setCategoryName("TEST2");
            categoryService.createCategory(categoryTest);
        }
    }
}
