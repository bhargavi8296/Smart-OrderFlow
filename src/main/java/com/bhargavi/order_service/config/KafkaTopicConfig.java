package com.bhargavi.order_service.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic orderTopic() {
        return new NewTopic("order-created", 1, (short) 1);
    }
}
//package com.bhargavi.order_service.config;
//
//import org.apache.kafka.clients.admin.NewTopic;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.config.TopicBuilder;
//
//@Configuration
//public class KafkaTopicConfig {
//
//    @Bean
//    public NewTopic orderTopic() {
//        return TopicBuilder
//                .name("order-topic")
//                .partitions(1)
//                .replicas(1)
//                .build();
//    }
//}