package com.bhargavi.order_service.entity;

import jakarta.validation.constraints.*;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Product name cannot be empty")
    private String productName;
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
    @Min(value = 1, message = "Price must be greater than 0")
    private double price;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;
    private static final long serialVersionUID = 1L;
}