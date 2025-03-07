import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (isAuthenticated === null) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth; // ✅ Ensure default export
