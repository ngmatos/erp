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

    Optional<Order> findByOrderNo(String orderNo);

    @Query("SELECT o FROM Order o WHERE FUNCTION('YEAR', o.dateOrdered) = :year AND FUNCTION('MONTH', o.dateOrdered) = :month")
    List<Order> findByYearAndMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT o FROM Order o WHERE DATE(o.dateOrdered) = :date")
    List<Order> findByDateOrdered(@Param("date") Date date);

    @Query("SELECT o.orderNo FROM Order o ORDER BY o.id DESC")
    String findLastOrderNo();

}
