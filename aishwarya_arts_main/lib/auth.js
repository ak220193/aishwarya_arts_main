import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "../lib/db";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    // 1. Google OAuth (For Customers)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 2. Credentials Provider (Dual-Purpose)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // --- A. HARDCODED ADMIN CHECK (Akash) ---
        const ADMIN_EMAIL = "aishwaryaarts@gmail.com";
        const ADMIN_PASSWORD = "123456";

        if (
          credentials.email === ADMIN_EMAIL &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return {
            id: "admin-1",
            name: "Akash",
            email: ADMIN_EMAIL,
            role: "admin",
            image: null, // Hardcoded admin has no DB avatar, set to null
          };
        }

        // --- B. DATABASE CUSTOMER CHECK ---
        try {
          await connectDB();
          // select("+password") is necessary because it's hidden by default in the model
          const user = await User.findOne({ email: credentials.email }).select("+password");

          if (!user) throw new Error("No user found with this email");

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) throw new Error("Incorrect password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.avatar || null, // Ensure this is null if empty
            role: "user",
          };
        } catch (error) {
          console.error("Auth Error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Standard login
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.picture = user.image || null; // FIXED: Prevents infinite 404 loops
      }

      // Handle session updates (if you use update() on the client side)
      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture; // Will be a URL or null
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Most users should go to /login
    error: "/auth/error", // Custom error page recommended
  },
  secret: process.env.NEXTAUTH_SECRET,
};