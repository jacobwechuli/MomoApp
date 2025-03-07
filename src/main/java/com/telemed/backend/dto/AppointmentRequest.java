package com.telemed.backend.dto;

import java.time.LocalDateTime;

public record AppointmentRequest(Long doctorId, Long patientId, LocalDateTime start, LocalDateTime appointmentTime) {
}
