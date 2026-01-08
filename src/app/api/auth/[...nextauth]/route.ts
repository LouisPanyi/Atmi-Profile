import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";

// PERBAIKAN: Ubah 'role?: string' menjadi 'role: string' agar sesuai dengan interface User
interface UserWithRole extends User {
  role: string;
}

export const authOptions: AuthOptions = {
  // === BAGIAN YANG DIUBAH ADA DI SINI ===
  session: { 
    strategy: "jwt",
    maxAge: 30 * 60, 
    
    updateAge: 5 * 60, // Cek/Perbarui setiap 5 menit
  },
  // ======================================

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const { rows } =
          await sql`SELECT * FROM users WHERE email=${credentials.email}`;
        const user = rows[0];

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        const allowedRoles = ["admin", "news_writer"];
        if (!allowedRoles.includes(user.role)) {
          throw new Error("Akses ditolak.");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role, // Pastikan ini string
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user",
        };
      },
    }),
  ],

  callbacks: {
    async signIn() {
      return true; 
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Casting ke UserWithRole sekarang aman karena role dijamin string
        token.role = (user as UserWithRole).role;
        token.name =
          user.name ||
          user.email?.split("@")[0] ||
          "Pengguna";
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };