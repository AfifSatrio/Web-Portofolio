"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { LogOut, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { ADMIN_NAV_LINKS as ADMIN_NAV } from "@/constants";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isWhitelisted, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !isLoginPage) {
      if (!user || !isWhitelisted) {
        router.push("/admin/login");
      }
    }
  }, [user, isWhitelisted, loading, isLoginPage, router]);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !user || !isWhitelisted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans gap-4">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-mono-500">
          MEMVERIFIKASI AKSES WHITELIST...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-mono-900 border-b border-mono-700 sticky top-0 z-40">
        <Link
          href="/"
          className="font-archivo text-lg font-black uppercase text-white tracking-tight hover:opacity-80 transition-opacity"
        >
          PORTFOLIO<span className="text-mono-500">.</span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-mono-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 h-full md:h-auto
          w-[280px] md:w-64 bg-mono-900 border-r border-mono-700
          flex flex-col justify-between p-6 shrink-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:transform-none
          overflow-y-auto
        `}
      >
        <div className="flex flex-col gap-8">
          {/* Logo / Title — hidden on mobile (already in top bar) */}
          <div className="hidden md:flex flex-col gap-1 border-b border-mono-700 pb-4">
            <Link
              href="/"
              className="font-archivo text-xl font-black uppercase text-white tracking-tight hover:opacity-80 transition-opacity"
            >
              PORTFOLIO<span className="text-mono-500">.</span>
            </Link>
            <span className="text-[10px] uppercase font-mono text-mono-500 tracking-widest">
              [ ADMIN CONTROL PANEL ]
            </span>
          </div>

          {/* Close button on mobile sidebar */}
          <div className="flex md:hidden items-center justify-between border-b border-mono-700 pb-4">
            <span className="text-[10px] uppercase font-mono text-mono-500 tracking-widest">
              [ ADMIN MENU ]
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-mono-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Info Card */}
          <div className="flex items-center gap-3 p-3 bg-black border border-mono-700 rounded-[4px]">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || "Admin"}
                width={32}
                height={32}
                unoptimized
                className="w-8 h-8 rounded-full border border-mono-700 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-mono-700 flex items-center justify-center font-bold text-xs">
                {user.email?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold truncate text-white">
                {user.displayName || "Admin User"}
              </span>
              <span className="text-[10px] text-mono-500 truncate">{user.email}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "text-mono-300 hover:text-white hover:bg-mono-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-3 pt-6 border-t border-mono-700 mt-6">
          <Link href="/" target="_blank">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs">
              <Globe className="w-4 h-4" />
              <span>LIHAT WEBSITE</span>
            </Button>
          </Link>

          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-xs border-mono-700 hover:bg-mono-700 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            <span>LOGOUT</span>
          </Button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto bg-black min-w-0">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
