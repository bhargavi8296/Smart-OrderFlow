package com.bhargavi.order_service.controller;

import java.util.List;

import com.bhargavi.order_service.dto.OrderRequestsDto;
import com.bhargavi.order_service.dto.OrderResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bhargavi.order_service.entity.Order;
import com.bhargavi.order_service.service.OrderService;

import jakarta.validation.Valid;
import org.springframework.data.domain.*;
import java.util.*;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/orders")
@Tag(name = "Order API", description = "Order Management APIs")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public OrderResponseDto createOrder(@Valid @RequestBody OrderRequestsDto dto) {
        Order savedOrder= orderService.saveOrder(dto);
        OrderResponseDto response=new OrderResponseDto();
        response.setId(savedOrder.getId());
        response.setProductName(savedOrder.getProductName());
        response.setQuantity(savedOrder.getQuantity());
        response.setPrice(savedOrder.getPrice());

        return response;
    }
    @GetMapping("/{id}")
    public OrderResponseDto getOrderById(@PathVariable Long id) {
        System.out.println("Controller reached with id = " + id);
        Order order= orderService.getOrderById(id);
        OrderResponseDto response=new OrderResponseDto();
        response.setId(order.getId());
        response.setProductName(order.getProductName());
        response.setQuantity(order.getQuantity());
        response.setPrice(order.getPrice());
        return response;
    }
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return "Order deleted successfully";
    }
    @GetMapping
    @Operation(summary = "Get all orders")
    public List<OrderResponseDto> getAllOrders() {
        List<Order>orders= orderService.getAllOrders();
        List<OrderResponseDto>responses=new ArrayList<>();
        for(Order order:orders)
        {
            OrderResponseDto response=new OrderResponseDto();
            response.setId(order.getId());
            response.setProductName(order.getProductName());
            response.setQuantity(order.getQuantity());
            response.setPrice(order.getPrice());
            responses.add(response);
        }
        return responses;
    }
    @PutMapping("/{id}")
    public OrderResponseDto updateOrder(@PathVariable Long id,
                             @RequestBody OrderRequestsDto order) {

        Order savedOrder=orderService.updateOrder(id, order);
        OrderResponseDto response=new OrderResponseDto();
        response.setId(savedOrder.getId());
        response.setProductName(savedOrder.getProductName());
        response.setQuantity(savedOrder.getQuantity());
        response.setPrice(savedOrder.getPrice());
        return response;
    }
    @GetMapping("/paged")
    public Page<OrderResponseDto> getOrders(
            @RequestParam int page,
            @RequestParam int size) {

        return orderService.getOrders(page, size);

    }
    @GetMapping("/sorted")
    public List<OrderResponseDto> getOrdersSorted() {

        return orderService.getOrdersSorted();
    }
}