package com.bhargavi.order_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bhargavi.order_service.entity.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByProductName(String productName);

    List<Order> findByPriceGreaterThan(double price);
}