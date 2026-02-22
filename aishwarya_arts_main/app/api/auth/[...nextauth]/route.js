import NextAuth from "next-auth";

import { connectDB } from "../../../../lib/db";
import { authOptions } from "../../../../lib/auth";

connectDB();



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
