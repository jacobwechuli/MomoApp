import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="flex gap-4">
      <Link href="/notifications">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">🔔 Notifications</button>
        </Link>
        <ThemeToggle />
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
