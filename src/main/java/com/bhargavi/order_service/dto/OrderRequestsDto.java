package com.bhargavi.order_service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
@Data
public class OrderRequestsDto {
    @NotBlank(message = "Product name cannot be empty")
    private String productName;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    @Min(value = 1, message = "Price must be greater than 0")
    private double price;
}
