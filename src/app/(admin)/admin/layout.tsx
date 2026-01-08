import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "@/components/admin/sidebar"; // Sesuaikan path sidebar Anda

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // 1. Cek Login
  if (!session) {
    redirect("/login");
  }
  
  // 2. Cek Role: Hanya Admin & News Writer yang boleh akses layout ini
  if (session.user.role === "user") {
    redirect("/"); 
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar hanya muncul untuk Admin & News Writer */}
      <Sidebar /> 
      
      <main className="flex-1 md:ml-64 transition-all duration-300">
        <div className="p-4 md:p-8 mt-16 md:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
}