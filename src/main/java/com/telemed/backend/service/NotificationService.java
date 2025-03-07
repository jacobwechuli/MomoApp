package com.telemed.backend.service;

import com.telemed.backend.model.Appointment;
import com.telemed.backend.model.Notification;
import com.telemed.backend.repository.Notificationrepository;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
    private final JavaMailSender mailSender;
    private final Notificationrepository notificationrepository;
    private final SmsService smsService;

    public NotificationService(JavaMailSender mailSender, Notificationrepository notificationrepository, SmsService smsService) {
        this.mailSender = mailSender;
        this.notificationrepository = notificationrepository;
        this.smsService = smsService;
    }
    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void sendAppointmentReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneDayLater = now.plusDays(1);
        LocalDateTime oneHourLater = now.plusHours(1);

        List<Notification> pendingNotifications = notificationrepository.findByStatus(Notification.Status.PENDING);

        for (Notification notification : pendingNotifications) {
            try {
                switch (notification.getType()) {
                    case EMAIL -> sendEmail(notification.getRecipient(), notification.getMessage());
                    case SMS -> smsService.sendSms(notification.getRecipient(), notification.getMessage());
                }
                notification.setStatus(Notification.Status.SENT);
                notification.setSentAt(LocalDateTime.now());
                notificationrepository.save(notification);

            } catch (Exception e) {
                notification.setStatus(Notification.Status.FAILED);
                notificationrepository.save(notification);
                System.err.println("Failed to send notification: " + e.getMessage());
            }
        }
    }
    public void sendEmail(String to, String message) throws Exception {
        MimeMessage mailMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mailMessage, true);
        helper.setTo(to);
        helper.setSubject("Telemed Appointment Reminder");
        helper.setText(message, false);
        mailSender.send(mailMessage);
    }
    public void scheduleAppointmentNotification(Appointment appointment, String recipientEmail, String recipientPhone) {
        LocalDateTime appointmentTime = appointment.getAppointmentTime();

        String message = "Reminder: You have an appointment scheduled for " + appointmentTime.toLocalDate() + " at " + appointmentTime.toLocalTime();

        Notification emailNotification = new Notification();
        emailNotification.setAppointmentId(appointment.getId());
        emailNotification.setRecipient(recipientEmail);
        emailNotification.setMessage(message);
        emailNotification.setType(Notification.NotificationType.EMAIL);
        emailNotification.setStatus(Notification.Status.PENDING);
        notificationrepository.save(emailNotification);

        Notification smsNotification = new Notification();
        smsNotification.setAppointmentId(appointment.getId());
        smsNotification.setRecipient(recipientPhone);
        smsNotification.setMessage(message);
        smsNotification.setType(Notification.NotificationType.SMS);
        smsNotification.setStatus(Notification.Status.PENDING);
        notificationrepository.save(smsNotification);
    }

    public List<Notification> getAllNotifications() {
        return notificationrepository.findAll();
    }
    public void saveNotification(Notification notification) {
        notificationrepository.save(notification);
    }
}
