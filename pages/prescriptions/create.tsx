import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
// import withAuth from "../../hoc/withAuth";
import axios from "axios";

const CreatePrescription: React.FC = () => {
  const [patientId, setPatientId] = useState("");
  const [medicineDetails, setMedicineDetails] = useState("");
  const [message, setMessage] = useState("");

  const handleCreatePrescription = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/prescription/create",
        null,
        {
          params: { patientId, medicineDetails },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(`Prescription created! Code: ${res.data.prescriptionCode}`);
    } catch (err) {
      console.error("Error creating prescription", err);
      setMessage("Failed to create prescription.");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Create Prescription</h1>
      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="border p-2"
      />
      <textarea
        placeholder="Medicine Details"
        value={medicineDetails}
        onChange={(e) => setMedicineDetails(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleCreatePrescription} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Prescription
      </button>
      {message && <p>{message}</p>}
    </DashboardLayout>
  );
};

export default CreatePrescription;
