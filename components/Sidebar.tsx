import Link from "next/link";

interface SidebarProps {
  role: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  const menuItems = {
    ADMIN: [
      { name: "Dashboard", path: "/dashboard/admin" },
      { name: "Manage Users", path: "/dashboard/admin/users" },
      { name: "Reports", path: "/dashboard/admin/reports" },
    ],
    DOCTOR: [
      { name: "Dashboard", path: "/dashboard/doctor" },
      { name: "Appointments", path: "/appointments/manage" },
      { name: "Prescriptions", path: "/prescriptions/create" },
    ],
    PATIENT: [
      { name: "Dashboard", path: "/dashboard/patient" },
      { name: "Book Appointment", path: "/appointments/book" },
      { name: "My Prescriptions", path: "/prescriptions" },
    ],
  };

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold">Telemed</h2>
      <nav className="mt-4">
        {menuItems[role as keyof typeof menuItems]?.map((item) => (
          <Link key={item.path} href={item.path}>
            <div className="p-2 hover:bg-gray-700 rounded">{item.name}</div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
