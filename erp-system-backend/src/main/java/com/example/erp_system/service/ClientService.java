package com.example.erp_system.service;

import com.example.erp_system.model.User;

import java.util.List;

public interface ClientService {
    List<User> getAllClients();
    User getClientById(Long id);
    User createClient(User client);
    User updateClient(Long id, User clientDetails);
    void deleteClient(Long id);
}
