package com.telemed.backend.controller;

import com.telemed.backend.model.Prescription;
import com.telemed.backend.model.User;
import com.telemed.backend.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prescription")
@RequiredArgsConstructor
public class PrescriptionController {
    private final PrescriptionService prescriptionService;

    @PostMapping("/create")
    public ResponseEntity<Prescription> createPrescription(
            Authentication authentication,
            @RequestParam Long patientId,
            @RequestParam String medicineDetails) {
        User doctor = (User) authentication.getPrincipal();
        User patient = new User();
        patient.setId(patientId);

        Prescription prescription = prescriptionService.createPrescription(doctor, patient, medicineDetails);
        return ResponseEntity.ok(prescription);
    }
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPrescription(@PathVariable Long patientId) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsForPatient(patientId));
    }
    @GetMapping("/verify/{code}")
    public ResponseEntity<?> verifyPrescription(@PathVariable String code) {
        Optional<Prescription> prescription = prescriptionService.verifyPrescription(code);
        return prescription.isPresent() ? ResponseEntity.ok(prescription.get()) : ResponseEntity.notFound().build();
    }

}
