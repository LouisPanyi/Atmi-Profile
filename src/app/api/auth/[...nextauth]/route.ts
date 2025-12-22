import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const { rows } = await sql`SELECT * FROM users WHERE email=${credentials.email}`;
        const user = rows[0];

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        const allowedRoles = ["admin", "news_writer"];
        if (!allowedRoles.includes(user.role)) {
          throw new Error("Akses ditolak. Role tidak dikenali.");
        }
        
        return {
          id: user.id.toString(), // Pastikan ID string
          name: user.name,        // Bisa null, akan di-handle di callback jwt
          email: user.email,
          role: user.role || 'user', // Default role jika kosong
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
    async jwt({ token, user }) {
      // Callback ini dipanggil setiap kali session diakses (token)
      // ATAU saat pertama kali login (user ada isinya)

      if (user) {
        // Logika Fallback Nama: Jika user.name null, pakai bagian depan email
        const safeName =
          user.name ||
          user.email?.split("@")[0] ||
          "Pengguna";

        token.id = user.id;
        token.role = (user as any).role; // Casting aman karena sudah dicek di authorize
        token.name = safeName;
        token.email = user.email;
      }

      // Pastikan token.name selalu ada untuk session yang sudah ada
      if (!token.name) {
        token.name = token.email?.split("@")[0] || "Pengguna";
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // Sekarang TypeScript sudah mengenali properti ini berkat perbaikan di .d.ts
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };