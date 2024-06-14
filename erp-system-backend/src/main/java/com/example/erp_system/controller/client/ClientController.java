package com.example.erp_system.controller.client;

import com.example.erp_system.model.User;
import com.example.erp_system.service.ClientService;
import com.example.erp_system.exception.CustomExceptions.ClientCreationException;
import com.example.erp_system.exception.CustomExceptions.ClientNotFoundException;
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
        try {
            User client = clientService.getClientById(clientId);
            return ResponseEntity.ok(client);
        } catch (ClientNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<User> createClient(@RequestBody User client) {
        try {
            User createdClient = clientService.createClient(client);
            return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
        } catch (ClientCreationException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    @PutMapping("/{clientId}")
    public ResponseEntity<User> updateClient(@PathVariable int clientId, @RequestBody User clientDetails) {
        try {
            User updatedClient = clientService.updateClient(clientId, clientDetails);
            return ResponseEntity.ok(updatedClient);
        } catch (ClientNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    @DeleteMapping("/{clientId}")
    public ResponseEntity<Void> deleteClient(@PathVariable int clientId) {
        try {
            clientService.deleteClient(clientId);
            return ResponseEntity.noContent().build();
        } catch (ClientNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
