import { Metadata } from "next";
import { fetchFooterFiles, fetchDownloadLogs } from "@/lib/data";
import InformasiClientPage from "@/components/admin/informasi/client-page";
import { getServerSession } from "next-auth"; // Import
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Import
import { redirect } from "next/navigation"; // Import

export const metadata: Metadata = {
  title: "Kelola Informasi & Download | Admin Panel",
};

export default async function InformasiPage() {
  // 1. LOGIKA KEAMANAN
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  // Hanya Admin yang boleh masuk sini
  if (session.user.role !== "admin") {
    redirect("/admin");
  }

  // 2. Ambil data aman
  const [files, logs] = await Promise.all([
    fetchFooterFiles(),
    fetchDownloadLogs()
  ]);

  return (
    <div className="p-8">
      <InformasiClientPage files={files} logs={logs} />
    </div>
  );
}