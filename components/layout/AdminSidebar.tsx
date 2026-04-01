"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  QrCode,
  LogOut,
  Wrench,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "לוח בקרה", icon: LayoutDashboard },
  { href: "/admin/customers", label: "לקוחות", icon: Users },
  { href: "/admin/qr", label: "סריקות QR", icon: QrCode },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-52 bg-primary text-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2 p-5 border-b border-white/10">
        <Wrench className="w-5 h-5 text-accent" />
        <span className="font-bold text-sm">ניהול מערכת</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-accent text-white font-semibold"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          התנתקות
        </button>
      </div>
    </aside>
  );
}
