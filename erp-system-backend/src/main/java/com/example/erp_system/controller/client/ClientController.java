package com.example.erp_system.controller.client;

import com.example.erp_system.model.User;
import com.example.erp_system.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

    @Autowired
    private ClientService clientService;

    // Endpoint para listar todos os clientes
    @GetMapping
    public ResponseEntity<List<User>> getAllClients() {
        List<User> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    // Endpoint para obter detalhes de um cliente específico
    @GetMapping("/{clientId}")
    public ResponseEntity<User> getClientById(@PathVariable Long clientId) {
        User client = clientService.getClientById(clientId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(client);
    }

    // Endpoint para registrar um novo cliente
    @PostMapping
    public ResponseEntity<User> createClient(@RequestBody User client) {
        User createdClient = clientService.createClient(client);
        return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
    }

    // Endpoint para atualizar os dados de um cliente existente
    @PutMapping("/{clientId}")
    public ResponseEntity<User> updateClient(@PathVariable Long clientId, @RequestBody User clientDetails) {
        User updatedClient = clientService.updateClient(clientId, clientDetails);
        if (updatedClient == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedClient);
    }

    // Endpoint para excluir um cliente
    @DeleteMapping("/{clientId}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long clientId) {
        clientService.deleteClient(clientId);
        return ResponseEntity.noContent().build();
    }
}