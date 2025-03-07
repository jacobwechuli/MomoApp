import { useRouter } from "next/router";

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-red-500 text-2xl">Authentication Error</h1>
      <p>{error ? `Error: ${error}` : "An unknown error occurred."}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.push("/auth/login")}
      >
        Go Back to Login
      </button>
    </div>
  );
}
