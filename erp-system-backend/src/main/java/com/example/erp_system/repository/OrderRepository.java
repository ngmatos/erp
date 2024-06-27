package com.example.erp_system.repository;

import com.example.erp_system.model.Category;
import com.example.erp_system.model.Order;
import com.example.erp_system.model.OrderStatus;
import com.example.erp_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findAllByOrderStatus(OrderStatus orderStatus);

    List<Order> findAllByCustomer(User customer);
}
