package com.bhargavi.order_service.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderConsumer {

    @KafkaListener(topics = "order-created", groupId = "order-group")
    public void consume(String message) {

        System.out.println("==================================");
        System.out.println("ORDER EVENT RECEIVED");
        System.out.println("Event Time       : " + LocalDateTime.now());
        System.out.println("Event Topic      : order-created");
        System.out.println("Event Payload    : " + message);

        System.out.println("----------------------------------");
        System.out.println("Audit Log        : Order creation event recorded");
        System.out.println("Notification     : Order confirmation notification prepared");
        System.out.println("Inventory Check  : Inventory update workflow triggered");
        System.out.println("Analytics Event  : Order data sent for revenue analysis");
        System.out.println("==================================");
    }
}