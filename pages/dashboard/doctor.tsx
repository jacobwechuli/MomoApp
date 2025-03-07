import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

const DoctorDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
      <p>Welcome, Doctor! Here you can manage your appointments and patients.</p>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
