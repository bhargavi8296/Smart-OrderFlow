package com.bhargavi.order_service.dto;
import lombok.*;
@Data
public class OrderResponseDto {
    private Long id;
    private String productName;
    private int quantity;
    private double price;

}
