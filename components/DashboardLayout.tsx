import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";  // ✅ Import Navbar correctly
import Sidebar from "./Sidebar"; // ✅ Import Sidebar correctly

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/auth/login"); // Redirect to login if not authenticated
      return;
    }

    const user = JSON.parse(userData);
    setUserRole(user.role); // Store the user's role
  }, [router]);

  if (!userRole) return <p>Loading...</p>; // Show loading state until role is retrieved

  return (
    <div className="flex h-screen">
      <Sidebar role={userRole} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;  // ✅ Ensure default export
