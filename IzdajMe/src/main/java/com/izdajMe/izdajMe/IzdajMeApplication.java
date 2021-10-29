package com.izdajMe.izdajMe;

import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class IzdajMeApplication {

	public static void main(String[] args) {

		SpringApplication.run(IzdajMeApplication.class, args);
	}

}