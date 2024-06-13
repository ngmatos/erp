package com.example.erp_system.service;

import com.example.erp_system.model.User;

import java.util.List;

public interface ClientService {
    List<User> getAllClients();
    User getClientById(int id);
    User createClient(User client);
    User updateClient(int id, User clientDetails);
    void deleteClient(int id);
}
