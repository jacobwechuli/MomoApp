package com.telemed.backend.controller;

import com.telemed.backend.service.KafkaProducerService;
import com.telemed.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private KafkaProducerService kafkaProducer;
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    @PostMapping("/trigger")
    public ResponseEntity<String> triggerManualNotification() {
        notificationService.sendAppointmentReminders();
        return ResponseEntity.ok("Notification Process triggered successfully");
    }
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestParam String message) {
        kafkaProducer.sendMessage("my-message", message);
        return ResponseEntity.ok("Message sent successfully");
    }
    @GetMapping
    public ResponseEntity<?> getNotifications() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }

}
