package com.telemed.backend.service;

import com.telemed.backend.dto.AppointmentRequest;
import com.telemed.backend.model.Appointment;
import com.telemed.backend.model.Availability;
import com.telemed.backend.model.Notification;
import com.telemed.backend.repository.AppointmentRepository;
import com.telemed.backend.repository.AvailabilityRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AvailabilityRepository availabilityRepository;
    private final NotificationService notificationService;

    public AppointmentService(AppointmentRepository appointmentRepository, AvailabilityRepository availabilityRepository, NotificationService notificationService) {
        this.appointmentRepository = appointmentRepository;
        this.availabilityRepository = availabilityRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public Appointment bookAppointment(AppointmentRequest request) {
        LocalDateTime appointmentTime = request.appointmentTime();
        LocalDate appointmentDate = appointmentTime.toLocalDate();
        LocalTime startTime = appointmentTime.toLocalTime();

        // Query availability with date and time
        Availability availability = availabilityRepository.findByDoctorIdAndDateAndStartTime(
                request.doctorId(),
                appointmentDate,
                startTime
        ).orElseThrow(() -> new IllegalStateException("Time slot not available"));

        if (availability.isBooked()) {
            throw new IllegalStateException("Time slot already booked");
        }

        // Mark the slot as booked
        availability.setBooked(true);
        availabilityRepository.save(availability);

        // Create the appointment
        Appointment appointment = new Appointment();
        appointment.setPatientId(request.patientId());
        appointment.setDoctorId(request.doctorId());
        appointment.setAppointmentTime(appointmentTime);
        appointment.setStatus(Appointment.Status.SCHEDULED);

        notificationService.scheduleAppointmentNotification(appointment, "wechulijac@gmail.com", "+254718952819");

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Transactional
    public void cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalStateException("Appointment not found"));
        appointment.setStatus(Appointment.Status.CANCELED);
        appointmentRepository.save(appointment);

        // Free the associated time slot
        LocalDateTime appointmentTime = appointment.getAppointmentTime();
        LocalDate appointmentDate = appointmentTime.toLocalDate();
        LocalTime startTime = appointmentTime.toLocalTime();

        availabilityRepository.findByDoctorIdAndDateAndStartTime(
                appointment.getDoctorId(),
                appointmentDate,
                startTime
        ).ifPresent(slot -> {
            slot.setBooked(false);
            availabilityRepository.save(slot);
        });

        // Notify patient about cancellation
        sendStatusChangeNotification(appointment, Appointment.Status.CANCELED);
    }

    @Transactional
    public Appointment updateAppointmentStatus(Long appointmentId, Appointment.Status newStatus) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalStateException("Appointment not found"));

        appointment.setStatus(newStatus);
        appointmentRepository.save(appointment);

        // Notify patient about status change
        sendStatusChangeNotification(appointment, newStatus);

        return appointment;
    }

    private void sendStatusChangeNotification(Appointment appointment, Appointment.Status newStatus) {
        String message = "Your appointment on " + appointment.getAppointmentTime().toLocalDate() +
                " at " + appointment.getAppointmentTime().toLocalTime() +
                " has been " + newStatus.name().toLowerCase() + ".";

        Notification notification = new Notification();
        notification.setAppointmentId(appointment.getId());
        notification.setRecipient("patient_email@example.com"); // Replace with actual patient email lookup
        notification.setMessage(message);
        notification.setType(Notification.NotificationType.EMAIL);
        notification.setStatus(Notification.Status.PENDING);
        notificationService.saveNotification(notification);
    }
}
