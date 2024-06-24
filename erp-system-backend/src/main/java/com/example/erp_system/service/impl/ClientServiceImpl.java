package com.example.erp_system.service.impl;

import com.example.erp_system.model.Role;
import com.example.erp_system.model.User;
import com.example.erp_system.repository.RoleRepository;
import com.example.erp_system.repository.UserRepository;
import com.example.erp_system.service.ClientService;
import com.example.erp_system.exception.CustomExceptions.ClientCreationException;
import com.example.erp_system.exception.CustomExceptions.ClientNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllClients() {
        return userRepository.findAllByRoleId(roleRepository.findByRoleName("CLIENT").getId());
    }

    @Override
    public User getClientById(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Client not found with id " + id));

        if (!"CLIENT".equals(user.getRole().getRoleName())) {
            throw new ClientNotFoundException("User with id " + id + " is not a client");
        }

        return user;
    }

    @Override
    public User createClient(User client) {
        try {
            client.setRole(roleRepository.findByRoleName("CLIENT"));

            String encodedPassword = passwordEncoder.encode(client.getPassword());
            client.setPassword(encodedPassword);

            return userRepository.save(client);
        } catch (Exception e) {
            throw new ClientCreationException("Failed to create client: " + e.getMessage());
        }
    }

    @Override
    public User updateClient(int id, User clientDetails) {
        User existingClient = userRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Client not found with id " + id));

        if (clientDetails.getName() != null && !clientDetails.getName().equals(existingClient.getName())) {
            existingClient.setName(clientDetails.getName());
        } else {
            existingClient.setName(existingClient.getName());
        }

        if (clientDetails.getEmail() != null && !clientDetails.getEmail().equals(existingClient.getEmail())) {
            existingClient.setEmail(clientDetails.getEmail());
        } else{
            existingClient.setEmail(existingClient.getEmail());
        }

        if (clientDetails.getAddress() != null && !clientDetails.getAddress().equals(existingClient.getAddress())) {
            existingClient.setAddress(clientDetails.getAddress());
        } else {
            existingClient.setAddress(existingClient.getAddress());
        }

        if (clientDetails.getPassword() != null && !clientDetails.getPassword().equals(existingClient.getPassword())) {
            String encodedPassword = passwordEncoder.encode(clientDetails.getPassword());
            existingClient.setPassword(encodedPassword);
        } else {
            existingClient.setPassword(existingClient.getPassword());
        }

        return userRepository.save(existingClient);
    }

    @Override
    public void deleteClient(int id) {
        if (!userRepository.existsById(id)) {
            throw new ClientNotFoundException("Client not found with id " + id);
        }
        userRepository.deleteById(id);
    }
}
