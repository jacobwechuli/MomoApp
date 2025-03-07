import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import withAuth from "../hoc/withAuth";
import axios from "axios";

interface Notification {
  id: number;
  appointmentId: number;
  recipient: string;
  message: string;
  status: "PENDING" | "SENT" | "FAILED";
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://localhost:8080/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load notifications.");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Notifications</h1>
      {error && <p className="text-red-500">{error}</p>}
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2">Message</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td className="py-2">{notification.message}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      notification.status === "SENT"
                        ? "bg-green-500 text-white"
                        : notification.status === "PENDING"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {notification.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
};

export default Notifications;
