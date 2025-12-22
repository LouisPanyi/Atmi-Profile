import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: string; // Tambahkan ini
    } & DefaultSession["user"]
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    role: string; // Tambahkan ini
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Tambahkan field ini agar terbaca di callback session
    id: string;
    role: string;
    name?: string | null;
    email?: string | null;
  }
}