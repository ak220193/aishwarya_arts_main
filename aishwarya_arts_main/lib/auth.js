import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "../lib/db";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

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

        // Normalize email to prevent "Incorrect Credentials" due to caps
        const inputEmail = credentials.email.toLowerCase().trim();
        const inputPassword = credentials.password.trim();

        // --- A. HARDCODED ADMIN CHECK (PRIORITY) ---
        const ADMIN_EMAIL = "aishwaryaarts@gmail.com";
        const ADMIN_PASSWORD = "123456";

        if (inputEmail === ADMIN_EMAIL && inputPassword === ADMIN_PASSWORD) {
          console.log("🚀 Admin Login Successful");
          return {
            id: "admin-1",
            name: "Akash",
            email: ADMIN_EMAIL,
            role: "admin",
            image: null,
          };
        }

        // --- B. DATABASE CUSTOMER CHECK ---
        try {
          await connectDB();
          // We select +password because it's hidden in your Schema
          const user = await User.findOne({ email: inputEmail }).select("+password");

          if (!user) {
            console.error("❌ Auth Error: No user found in DB");
            throw new Error("Invalid email or password");
          }

          const isValid = await bcrypt.compare(inputPassword, user.password);

          if (!isValid) {
            console.error("❌ Auth Error: Password mismatch");
            throw new Error("Invalid email or password");
          }

          return {
            id: user._id.toString(),
            name: `${user.firstName} ${user.lastName || ""}`.trim(),
            email: user.email,
            image: user.avatar || null,
            role: "user",
          };
        } catch (error) {
          // Providing a generic error to the UI for security, but logging detail to server
          console.error("Database Auth Error:", error.message);
          throw new Error(error.message || "Internal Server Error");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.picture = user.image || null;
      }
      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};