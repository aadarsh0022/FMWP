"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, BarChart2, LogOut, Menu } from "lucide-react";
import clsx from "clsx";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      {/* Toggle button always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full bg-gray-900 text-white p-4 pt-16 shadow-lg transition-all duration-300 z-40",
          {
            "w-64": isOpen,
            "w-20": !isOpen,
          }
        )}
      >
        <div
          className={clsx("text-2xl font-bold mb-8 transition-opacity", {
            "opacity-100": isOpen,
            "opacity-0": !isOpen,
          })}
        >
          {isOpen ? "FMWP" : ""}
        </div>

        <nav className="flex flex-col gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <Home size={20} />
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <BarChart2 size={20} />
            {isOpen && <span>Analytics</span>}
          </Link>
          <button className="flex items-center gap-2 hover:text-red-400 mt-auto">
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Push content right if sidebar is open */}
      <div
        className={clsx("transition-all duration-300", {
          "ml-64": isOpen,
          "ml-20": !isOpen,
        })}
      >
        {/* Your main page content goes here */}
      </div>
    </div>
  );
}
