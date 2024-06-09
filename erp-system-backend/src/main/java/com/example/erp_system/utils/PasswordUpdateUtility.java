package com.example.erp_system.utils;

import com.example.erp_system.model.Role;
import com.example.erp_system.model.User;
import com.example.erp_system.repository.UserRepository;
import com.example.erp_system.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PasswordUpdateUtility {

    private static final Logger logger = LoggerFactory.getLogger(PasswordUpdateUtility.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final RoleService roleService;

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

    @PostConstruct
    public void addRoleTest() {
        Role role = new Role();
        role.setRoleName("TEST");
        roleService.saveRole(role);
    }
}
