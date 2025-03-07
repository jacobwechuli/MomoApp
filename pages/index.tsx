import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Momo Telemedicine</h1>
      <p className="mb-6">Your trusted platform for online medical consultations.</p>

      <div className="flex space-x-4">
        <Link href="/auth/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
        </Link>
        <Link href="/auth/register">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Sign Up</button>
        </Link>
      </div>

      <div className="mt-6">
        <ThemeToggle /> {/* Dark/Light Mode Toggle */}
      </div>
    </div>
  );
}
