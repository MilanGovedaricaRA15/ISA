package com.izdajMe.izdajMe.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;

public interface EmailService {
    @Async
    public void sendSimpleMessage(SimpleMailMessage mail);
}
