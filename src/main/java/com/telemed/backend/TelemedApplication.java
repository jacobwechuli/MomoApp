package com.telemed.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TelemedApplication {

	public static void main(String[] args) {
		SpringApplication.run(TelemedApplication.class, args);
	}

}
