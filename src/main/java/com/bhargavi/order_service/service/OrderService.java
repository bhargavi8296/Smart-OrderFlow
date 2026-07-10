package com.bhargavi.order_service.service;
import com.bhargavi.order_service.dto.OrderRequestsDto;
import com.bhargavi.order_service.dto.OrderResponseDto;
import com.bhargavi.order_service.exception.*;
import java.util.List;
import java.util.Optional;

import com.bhargavi.order_service.kafka.OrderProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.bhargavi.order_service.entity.Order;
import com.bhargavi.order_service.repository.OrderRepository;
import org.springframework.data.domain.*;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderProducer orderProducer;

    public Order saveOrder(OrderRequestsDto dto) {
        Order order=new Order();
        order.setProductName(dto.getProductName());
        order.setQuantity(dto.getQuantity());
        order.setPrice(dto.getPrice());
        Order savedOrder = orderRepository.save(order);
        System.out.println("Order saved in DB");

        System.out.println("About to send Kafka message");

        orderProducer.sendMessage("Order Created : " + savedOrder.getProductName());

        System.out.println("Kafka message method completed");
        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    @Cacheable(value = "orders", key = "#id")
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new OrderNotFoundException("Order not found with id: " + id));
    }
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
    @CacheEvict(value = "orders", key = "#id")
    public Order updateOrder(Long id, OrderRequestsDto updatedOrder) {

        Order order = orderRepository.findById(id).orElse(null);

        if (order != null) {
            order.setProductName(updatedOrder.getProductName());
            order.setQuantity(updatedOrder.getQuantity());
            order.setPrice(updatedOrder.getPrice());

            return orderRepository.save(order);
        }

        return null;
    }
    public Page<OrderResponseDto> getOrders(int page, int size) {

        Page<Order> orders =
                orderRepository.findAll(PageRequest.of(page, size));
        return orders.map(this::convertToDto);
    }
    private OrderResponseDto convertToDto(Order order) {

        OrderResponseDto dto = new OrderResponseDto();

        dto.setId(order.getId());
        dto.setProductName(order.getProductName());
        dto.setQuantity(order.getQuantity());
        dto.setPrice(order.getPrice());

        return dto;
    }
    public List<OrderResponseDto> getOrdersSorted() {

        return orderRepository.findAll(
                Sort.by("price").descending()).stream().map(this::convertToDto).toList();
    }
}