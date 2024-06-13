package com.example.erp_system.controller.client;

import com.example.erp_system.model.User;
import com.example.erp_system.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<User>> getAllClients() {
        List<User> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<User> getClientById(@PathVariable int clientId) {
        User client = clientService.getClientById(clientId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(client);
    }

    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<User> createClient(@RequestBody User client) {
        User createdClient = clientService.createClient(client);
        return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    @PutMapping("/{clientId}")
    public ResponseEntity<User> updateClient(@PathVariable int clientId, @RequestBody User clientDetails) {
        User updatedClient = clientService.updateClient(clientId, clientDetails);
        if (updatedClient == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedClient);
    }

    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    @DeleteMapping("/{clientId}")
    public ResponseEntity<Void> deleteClient(@PathVariable int clientId) {
        clientService.deleteClient(clientId);
        return ResponseEntity.noContent().build();
    }
}
