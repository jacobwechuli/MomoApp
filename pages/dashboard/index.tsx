import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push("/auth/login");
      } else {
        setUser(session.user);
      }
    });
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>
    </div>
  );
}
