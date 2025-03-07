package com.telemed.backend.repository;

import com.telemed.backend.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import jakarta.persistence.LockModeType;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Availability> findByDoctorIdAndDateAndStartTime(Long doctorId, LocalDate date, LocalTime startTime);
}
