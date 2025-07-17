// app/dashboard/layout.tsx
import { Sidebar } from "@/app/components/layout/Sidebar";
import { AppBar } from "@/app/components/layout/AppBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <AppBar />
        <main className="flex-1 p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
