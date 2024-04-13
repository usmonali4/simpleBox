package com.levelUp.simpleBox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class SimpleBoxApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleBoxApplication.class, args);
	}

}
