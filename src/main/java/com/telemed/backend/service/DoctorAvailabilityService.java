package com.telemed.backend.service;

import com.telemed.backend.model.Availability;
import com.telemed.backend.repository.AvailabilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorAvailabilityService {
    private final AvailabilityRepository repository;

    public DoctorAvailabilityService(AvailabilityRepository repository) {
        this.repository = repository;
    }
    public List<Availability> getAllAvailabilities() {
        return repository.findAll();
    }
    public Availability createDoctorAvailability(Availability availability) {
        return repository.save(availability);
    }
}

