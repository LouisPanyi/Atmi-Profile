import Sidebar from "@/components/admin/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// Import ActivityMonitor yang baru dibuat
import ActivityMonitor from "@/components/admin/activity-monitor";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ActivityMonitor />
      <Sidebar />
      
      <main className="flex-1 w-full md:ml-64 min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}