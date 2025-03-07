import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// 🔹 Extend the built-in User type
interface CustomUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string; // JWT token from backend
}

// 🔹 Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken: string;
  }
}

// 🔹 Extend Session type
declare module "next-auth" {
  interface User {
    role: string;
    token: string;
    id: string;
  }
  
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      token: string; // ✅ Include token in session
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" }, // ✅ Fix field name
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          // 🔹 Send login request to backend
          const res = await axios.post("http://localhost:8080/api/auth/login", null, {
            params: { username: credentials.username, password: credentials.password },
          });

          const token = res.data; // Backend currently returns only the token

          // 🔹 Fetch user details from backend
          const userRes = await axios.get(`http://localhost:8080/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const user = userRes.data;

          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
            role: user.role,
            token: token, // ✅ Store token
          };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
  debug: true,
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: session.user.name,
        email: session.user.email,
        role: token.role,
        token: token.accessToken, // ✅ Pass token to frontend session
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
