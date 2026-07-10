package com.bhargavi.order_service.entity;


import jakarta.persistence.*;

@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;

    private String state;

    @OneToOne(mappedBy = "address")
    private User user;
}