package com.example.erp_system.service.impl;

import com.example.erp_system.model.Role;
import com.example.erp_system.model.User;
import com.example.erp_system.repository.RoleRepository;
import com.example.erp_system.repository.UserRepository;
import com.example.erp_system.service.ClientService;
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
    public User getClientById(Long id) {
        Optional<User> optionalClient = userRepository.findById(id);
        return optionalClient.orElse(null);
    }

    @Override
    public User createClient(User client) {
        client.setRole(roleRepository.findByRoleName("CLIENT"));

        String encodedPassword = passwordEncoder.encode(client.getPassword());
        client.setPassword(encodedPassword);

        return userRepository.save(client);
    }

    @Override
    public User updateClient(Long id, User clientDetails) {
        Optional<User> optionalClient = userRepository.findById(id);
        if (optionalClient.isPresent()) {
            User existingClient = optionalClient.get();
            existingClient.setName(clientDetails.getName());
            existingClient.setEmail(clientDetails.getEmail());
            existingClient.setAddress(clientDetails.getAddress());
            return userRepository.save(existingClient);
        }
        return null;
    }

    @Override
    public void deleteClient(Long id) {
        userRepository.deleteById(id);
    }
}
