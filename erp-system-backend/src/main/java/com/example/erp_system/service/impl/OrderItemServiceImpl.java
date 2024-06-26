package com.example.erp_system.service.impl;

import com.example.erp_system.model.Items;
import com.example.erp_system.model.Order;
import com.example.erp_system.model.OrderItem;
import com.example.erp_system.repository.ItemsRepository;
import com.example.erp_system.repository.OrderItemRepository;
import com.example.erp_system.repository.OrderRepository;
import com.example.erp_system.service.OrderItemService;
import com.example.erp_system.exception.CustomExceptions.OrderItemCreationException;
import com.example.erp_system.exception.CustomExceptions.OrderItemNotFoundException;
import com.example.erp_system.exception.CustomExceptions.OrderItemUpdateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ItemsRepository itemsRepository;

    @Override
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    @Override
    public Optional<List<OrderItem>> getOrderItemsByQuantity(int quantity) {
        try {
            List<OrderItem> orderItems = orderItemRepository.findAllByQuantity(quantity);
            return Optional.of(orderItems);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar itens por quantidade: " + quantity, e);
        }
    }

    @Override
    public Optional<OrderItem> getOrderItemById(int id) {
        return orderItemRepository.findById(id);
    }

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        try {
            Optional<Order> order = orderRepository.findById(orderItem.getOrder().getId());
            if (order.isPresent()){
                orderItem.setOrder(order.get());
            } else {
                throw new OrderItemCreationException("Pedido não encontrado com o ID " + orderItem.getOrder().getId());
            }

            Optional<Items> item = itemsRepository.findById(orderItem.getItem().getId());
            if (item.isPresent()){
                orderItem.setItem(item.get());
            } else {
                throw new OrderItemCreationException("Item não encontrado com o ID " + orderItem.getItem().getId());
            }

            return orderItemRepository.save(orderItem);
        } catch (Exception e) {
            throw new OrderItemCreationException("Falha ao criar item de pedido: " + e.getMessage());
        }
    }

    @Override
    public Optional<OrderItem> updateOrderItem(int id, OrderItem orderItemDetails) {
        Optional<OrderItem> orderItem = orderItemRepository.findById(id);

        if (orderItem.isPresent()) {
            OrderItem updatedOrderItem = orderItem.get();

            // Atualiza o order se fornecido e diferente do existente
            if (orderItemDetails.getOrder() != null) {
                Optional<Order> order = orderRepository.findById(orderItemDetails.getOrder().getId());

                if (order.isPresent()) {
                    updatedOrderItem.setOrder(order.get());
                } else {
                    throw new OrderItemUpdateException("Pedido não encontrado com o ID " + orderItemDetails.getOrder().getId());
                }
            }

            // Atualiza o item se fornecido e diferente do existente
            if (orderItemDetails.getItem() != null) {
                Optional<Items> item = itemsRepository.findById(orderItemDetails.getItem().getId());

                if (item.isPresent()) {
                    updatedOrderItem.setItem(item.get());
                } else {
                    throw new OrderItemUpdateException("Item não encontrado com o ID " + orderItemDetails.getItem().getId());
                }
            }

            // Atualiza a quantidade se fornecida e diferente do existente
            if (orderItemDetails.getQuantity() != updatedOrderItem.getQuantity()) {
                updatedOrderItem.setQuantity(orderItemDetails.getQuantity());
            }

            return Optional.of(orderItemRepository.save(updatedOrderItem));
        } else {
            throw new OrderItemUpdateException("Item de pedido não encontrado com o ID " + id);
        }
    }


    @Override
    public void deleteOrderItem(int id) {
        if (!orderItemRepository.existsById(id)) {
            throw new OrderItemNotFoundException("Item de pedido não encontrado com o ID " + id);
        }
        orderItemRepository.deleteById(id);
    }

    @Override
    public Optional<OrderItem> updateQuantity(int id, int quantity) {
        Optional<OrderItem> orderItem = orderItemRepository.findById(id);
        if (orderItem.isPresent()) {
            OrderItem updatedOrderItem = orderItem.get();
            updatedOrderItem.setQuantity(quantity);
            return Optional.of(orderItemRepository.save(updatedOrderItem));
        } else {
            throw new OrderItemUpdateException("Item de pedido não encontrado com o ID " + id);
        }
    }
}
