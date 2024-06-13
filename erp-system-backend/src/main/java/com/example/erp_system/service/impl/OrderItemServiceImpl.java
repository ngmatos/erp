package com.example.erp_system.service.impl;

import com.example.erp_system.model.Items;
import com.example.erp_system.model.Order;
import com.example.erp_system.model.OrderItem;
import com.example.erp_system.repository.ItemsRepository;
import com.example.erp_system.repository.OrderItemRepository;
import com.example.erp_system.repository.OrderRepository;
import com.example.erp_system.service.OrderItemService;
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
    public Optional<List<OrderItem>> getOrderItemsByItemName(String itemName) {
        try {
            Optional<Items> item = itemsRepository.findByName(itemName);
            if (item.isPresent()) {
                List<OrderItem> orderItems = orderItemRepository.findByOrderId(item.get().getItemId());
                return Optional.of(orderItems);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar itens por nome: " + itemName, e);
        }
    }

    @Override
    public Optional<List<OrderItem>> getOrderItemsByOrderNo(String orderNo) {
        try {
            Optional<Order> order = orderRepository.findByOrderNo(orderNo);
            if (order.isPresent()) {
                List<OrderItem> orderItems = orderItemRepository.findByOrderId(order.get().getOrderId());
                return Optional.of(orderItems);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar itens por número de pedido: " + orderNo, e);
        }
    }

    @Override
    public Optional<OrderItem> getOrderItemById(int id) {
        return orderItemRepository.findById(id);
    }

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public Optional<OrderItem> updateOrderItem(int id, OrderItem orderItemDetails) {
        Optional<OrderItem> orderItem = orderItemRepository.findById(id);
        if (orderItem.isPresent()) {
            OrderItem updatedOrderItem = orderItem.get();
            updatedOrderItem.setOrder(orderItemDetails.getOrder());
            updatedOrderItem.setItem(orderItemDetails.getItem());
            updatedOrderItem.setQuantity(orderItemDetails.getQuantity());
            return Optional.of(orderItemRepository.save(updatedOrderItem));
        } else {
            return Optional.empty();
        }
    }

    @Override
    public void deleteOrderItem(int id) {
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
            return Optional.empty();
        }
    }

}
