"use client";

import { useState } from "react";
import { AppBar } from "@/app/components/layout/AppBar";
import { Sidebar } from "@/app/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        sidebarExpanded={sidebarExpanded}
        setSidebarOpen={setSidebarOpen}
        setSidebarExpanded={setSidebarExpanded}
      />

      <div className="flex-1 flex flex-col">
        <AppBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
