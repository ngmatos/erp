package com.example.erp_system.service;

import com.example.erp_system.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserAuthService {
    UserDetailsService userDetailsService();
}