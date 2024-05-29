package com.example.erp_system.service;

import com.example.erp_system.model.User;
import com.example.erp_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Outros métodos de serviço
}
