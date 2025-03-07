import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // If user is already logged in, redirect to their dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const user = JSON.parse(userData);
      console.log("✅ User already logged in, redirecting to:", user.role);

      if (user.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (user.role === "DOCTOR") {
        router.push("/dashboard/doctor");
      } else {
        router.push("/dashboard/patient");
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("🔹 Sending login request:", { username, password });

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", null, {
        params: { username, password },
      });

      console.log("✅ Backend Response:", res.data);

      if (res.status === 200 && res.data.token) {
        console.log("🔹 Storing token...");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));

        console.log("🔹 Redirecting user based on role...");

        if (res.data.role === "ADMIN") {
          router.push("/dashboard/admin");
        } else if (res.data.role === "DOCTOR") {
          router.push("/dashboard/doctor");
        } else {
          router.push("/dashboard/patient");
        }
      } else {
        console.error("❌ Unexpected Response Format:", res.data);
        setError("Unexpected server response");
      }
    } catch (err) {
      if (err.response) {
        console.error("❌ Response Data:", err.response.data);
        console.error("❌ Response Status:", err.response.status);
        console.error("❌ Response Headers:", err.response.headers);

        if (err.response.status === 401) {
          setError("Invalid username or password");
        } else {
          setError("Server error. Please try again.");
        }
      } else if (err.request) {
        console.error("❌ No Response Received:", err.request);
        setError("No response from server.");
      } else {
        console.error("❌ Request Error:", err.message);
        setError("Error sending request.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80">
        <input
          className="w-full p-2 border mb-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
