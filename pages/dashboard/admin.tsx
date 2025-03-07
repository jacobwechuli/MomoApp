import DashboardLayout from "../../components/DashboardLayout";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage users, view analytics, and more.</p>
    </DashboardLayout>
  );
}
