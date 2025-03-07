import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import withAuth from "../../hoc/withAuth";
import axios from "axios";

const VerifyPrescription: React.FC = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/prescription/verify/${code}`);
      setResult(`Valid Prescription: ${res.data.medicineDetails}`);
    } catch (err) {
      console.error("Invalid prescription code", err);
      setResult("Invalid or expired prescription code.");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Verify Prescription</h1>
      <input
        type="text"
        placeholder="Enter Prescription Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleVerify} className="bg-blue-500 text-white px-4 py-2 rounded">
        Verify
      </button>
      {result && <p>{result}</p>}
    </DashboardLayout>
  );
};

export default withAuth(VerifyPrescription);
