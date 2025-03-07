import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        fetch("http://localhost:8080/api/admin/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => {
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, [navigate]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div>
          <h2>Dashboard</h2>
          {user ? <p>Welcome, {user.name}!</p> : <p>Loading...</p>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    };
    
    export default Dashboard;
