import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import withAuth from "../../hoc/withAuth";
import axios from "axios";

interface Availability {
  id: number;
  doctorId: number;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const BookAppointment: React.FC = () => {
  const [doctorId, setDoctorId] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/availability", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAvailability(res.data))
      .catch((err) => console.error("Error fetching availability", err));
  }, []);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      await axios.post(
        "http://localhost:8080/api/appointments",
        {
          patientId: user.userId,
          doctorId: doctorId,
          appointmentTime: selectedTime,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Appointment booked successfully!");
    } catch (err) {
      console.error("Error booking appointment", err);
      setMessage("Failed to book appointment.");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Book an Appointment</h1>

      <label className="block">Select Doctor</label>
      <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="border p-2">
        {availability.map((avail) => (
          <option key={avail.id} value={avail.doctorId}>
            Doctor {avail.doctorId}
          </option>
        ))}
      </select>

      <label className="block">Select Time</label>
      <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="border p-2">
        {availability
          .filter((avail) => avail.doctorId.toString() === doctorId && !avail.isBooked)
          .map((avail) => (
            <option key={avail.id} value={`${avail.date}T${avail.startTime}`}>
              {avail.date} - {avail.startTime}
            </option>
          ))}
      </select>

      <button onClick={handleBooking} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Book Appointment
      </button>

      {message && <p>{message}</p>}
    </DashboardLayout>
  );
};

export default withAuth(BookAppointment);
