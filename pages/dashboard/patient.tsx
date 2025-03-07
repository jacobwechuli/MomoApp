import DashboardLayout from "../../components/DashboardLayout";

export default function PatientDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Patient Dashboard</h1>
      <p>Welcome, Patient! Here you can view your upcoming appointments.</p>
    </DashboardLayout>
  );
}
