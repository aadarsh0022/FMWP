"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// third party
import {
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import clsx from "clsx";

// constants
import { menuItems } from "./constant";

type SidebarProps = {
  sidebarOpen: boolean;
  sidebarExpanded: boolean;
  setSidebarOpen: (value: boolean) => void;
  setSidebarExpanded: (value: boolean) => void;
};

export function Sidebar({
  sidebarOpen,
  sidebarExpanded,
  setSidebarOpen,
  setSidebarExpanded,
}: SidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const toggleMenu = (id: string) =>
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={clsx(
          "flex flex-col transition-all duration-300 ease-in-out z-50 border-r border-[#1f2937]",
          "bg-[#111827] text-white",
          sidebarExpanded ? "lg:w-64" : "lg:w-16",
          "lg:translate-x-0 lg:relative",
          sidebarOpen
            ? "translate-x-0 fixed h-full"
            : "-translate-x-full fixed h-full"
        )}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-8 bg-[#2563eb] text-white font-bold rounded-lg flex items-center justify-center">
              F
            </div>
            {sidebarExpanded && <h1 className="text-xl font-bold">FinWise</h1>}
          </div>
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="hidden lg:flex text-gray-400 mr-2"
          >
            {sidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400"
          >
            <X />
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          {/* Navigation */}
          <nav className="flex flex-col gap-2 px-2">
            {menuItems.map(({ id, label, icon: Icon, href, children }) => {
              const isParentActive = href
                ? isActive(href)
                : children?.some((child) => isActive(child.href));
              const isOpen = openMenus[id];

              return (
                <div key={id}>
                  <div
                    className={clsx(
                      "group flex items-center rounded-lg py-2 px-3 relative transition-colors cursor-pointer",
                      sidebarExpanded
                        ? "justify-start gap-3"
                        : "justify-center",
                      isParentActive
                        ? "bg-[#1f2937] text-white"
                        : "text-gray-400 hover:bg-[#1f2937] hover:text-white"
                    )}
                    onClick={() =>
                      children ? toggleMenu(id) : setSidebarOpen(false)
                    }
                  >
                    <Icon className="w-5 h-5" />
                    {sidebarExpanded && (
                      <>
                        <span className="flex-1">{label}</span>
                        {children &&
                          (isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          ))}
                      </>
                    )}
                    {!sidebarExpanded && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                        {label}
                      </div>
                    )}
                  </div>

                  {/* Child Links */}
                  {children && isOpen && sidebarExpanded && (
                    <div className="ml-8 mt-1 flex flex-col gap-1">
                      {children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className={clsx(
                            "text-sm py-1 px-2 rounded hover:bg-[#1f2937] transition-colors flex items-center gap-2",
                            isActive(child.href)
                              ? "text-white bg-[#1f2937]"
                              : "text-gray-400 hover:text-white"
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <child.icon className="w-4 h-4" /> {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <footer className="p-3 border-t border-[#1f2937] text-xs text-gray-400">
            {sidebarExpanded ? (
              <div className="flex-1 gap-1 flex flex-col justify-between">
                <div className="flex  justify-between items-center">
                  <p className="text-center sm:text-left">
                    Made with ❤️ by Aadarsh.
                  </p>
                  <a
                    href="https://your-support-link.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Help
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-center sm:text-left">
                    &copy; {new Date().getFullYear()} FinWise. All rights
                    reserved.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <span className="text-[10px]">v1.0.0</span>
              </div>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
