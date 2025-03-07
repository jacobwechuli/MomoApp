package com.telemed.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long appointmentId;
    private String recipient;
    private String message;
    private NotificationType type;
    private LocalDateTime sentAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PENDING, SENT, FAILED
    }
    public enum NotificationType {
        EMAIL, SMS
    }
}
