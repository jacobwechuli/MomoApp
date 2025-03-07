package com.telemed.backend.service;

import com.telemed.backend.model.Prescription;
import com.telemed.backend.model.User;
import com.telemed.backend.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PrescriptionService {
    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }
    public Prescription createPrescription(User doctor, User patient, String medicineDetails) {
        Prescription prescription = Prescription.builder()
                .doctor(doctor)
                .patient(patient)
                .medicineDetails(medicineDetails)
                .prescriptionCode(UUID.randomUUID().toString())
                .build();
        return prescriptionRepository.save(prescription);
    }
    public List<Prescription> getPrescriptionsForPatient(Long patientId) {
        return prescriptionRepository.findAll()
                .stream()
                .filter(p -> p.getPatient().getId().equals(patientId))
                .toList();
    }
    public Optional<Prescription> verifyPrescription(String code) {
        return prescriptionRepository.findByPrescriptionCode(code);
    }
}
