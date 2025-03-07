package com.telemed.backend.repository;

import com.telemed.backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Notificationrepository extends JpaRepository<Notification, Long> {
    List<Notification> findByStatus(Notification.Status status);
}
