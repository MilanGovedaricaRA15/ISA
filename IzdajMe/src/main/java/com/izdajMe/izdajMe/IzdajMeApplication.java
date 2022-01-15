package com.izdajMe.izdajMe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class IzdajMeApplication {

    public static void main(String[] args) {
        SpringApplication.run(IzdajMeApplication.class, args);
    }

}