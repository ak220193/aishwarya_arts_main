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
        // --- A. HARDCODED ADMIN CHECK (Akash) ---
        const ADMIN_EMAIL = "aishwaryaarts@gmail.com";
        const ADMIN_PASSWORD = "123456";

        if (
          credentials?.email === ADMIN_EMAIL &&
          credentials?.password === ADMIN_PASSWORD
        ) {
          // Returns instant session for admin without hitting the DB
          return {
            id: "admin-1",
            name: "Akash",
            email: ADMIN_EMAIL,
            role: "admin", // Used to distinguish from customers
          };
        }

        // --- B. DATABASE CUSTOMER CHECK ---
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select("+password");
        
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.avatar,
          role: "user",
        };
      },
    }),
  ],
  session: { 
    strategy: "jwt" 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Add role to the token
        token.picture = user.image || "/assets/default-avatar.png";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role; // Add role to the session
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: { 
    signIn: "/admin", // Redirect for unauthorized admin attempts
  },
  secret: process.env.NEXTAUTH_SECRET,
};