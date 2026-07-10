package com.bhargavi.order_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class OrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication app =
				new SpringApplication(OrderServiceApplication.class);

		app.setAdditionalProfiles("local");
		app.run(args);
	}
}