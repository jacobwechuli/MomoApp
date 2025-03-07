package com.telemed.backend.controller;

import com.telemed.backend.model.Availability;
import com.telemed.backend.service.DoctorAvailabilityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class DoctorAvailabilityController {
    private final DoctorAvailabilityService service;

    public DoctorAvailabilityController(DoctorAvailabilityService service) {
        this.service = service;
    }
    @GetMapping
    public List<Availability> getAvailabilities() {
        return service.getAllAvailabilities();
    }
    @PostMapping
    public Availability createAvailability(@RequestBody Availability availability) {
        return service.createDoctorAvailability(availability);
    }
}
