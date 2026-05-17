"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Briefcase, BarChart3, Clock, Gift,
  HeartHandshake, TrendingUp, DollarSign, Menu, X,
  ChevronRight, ArrowLeft, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/business/rm-hub" },
  { id: "employees", label: "Employees", icon: Users, path: "/dashboard/business/rm-hub/employees" },
  { id: "hiring", label: "Hiring & Onboarding", icon: Briefcase, path: "/dashboard/business/rm-hub/hiring" },
  { id: "data", label: "HR Data & Reports", icon: BarChart3, path: "/dashboard/business/rm-hub/data" },
  { id: "payroll", label: "Payroll & Time", icon: Clock, path: "/dashboard/business/rm-hub/payroll" },
  { id: "benefits", label: "Benefits", icon: Gift, path: "/dashboard/business/rm-hub/benefits" },
  { id: "experience", label: "Employee Experience", icon: HeartHandshake, path: "/dashboard/business/rm-hub/experience" },
  { id: "performance", label: "Performance", icon: TrendingUp, path: "/dashboard/business/rm-hub/performance" },
  { id: "compensation", label: "Compensation", icon: DollarSign, path: "/dashboard/business/rm-hub/compensation" },
];

export default function RMHubLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden">
        <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-200 flex items-center justify-between px-4 h-14">
          <button onClick={() => setMobileOpen(true)} className="p-2 -ml-2 text-slate-600 hover:text-slate-900">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-700 rounded flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-['Barlow_Condensed'] text-base font-bold tracking-wide text-slate-800">RM HUB</span>
          </div>
          <div className="w-9" />
        </header>
        {mobileOpen && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />}
        <div className={cn("fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300", mobileOpen ? "translate-x-0" : "-translate-x-full")}>
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-['Barlow_Condensed'] text-base font-bold text-slate-800 tracking-wide">RM HUB</h2>
                <p className="text-[10px] text-slate-500">Resource Management</p>
              </div>
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4" />Back to Dashboard
          </Link>
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path || (item.id !== "dashboard" && pathname.startsWith(item.path));
              return (
                <Link key={item.id} href={item.path} onClick={() => setMobileOpen(false)}
                  className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                    isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  )}>
                  <Icon className="w-4 h-4" /><span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="h-14" />
      </div>

      {/* Desktop Sidebar */}
      <aside className={cn("hidden md:flex bg-white border-r border-slate-200 transition-all duration-300 flex-col", collapsed ? "w-16" : "w-60")}>
        <div className="p-4 border-b border-slate-200">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />{!collapsed && <span>Dashboard</span>}
          </Link>
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-['Barlow_Condensed'] text-base font-bold text-slate-800 tracking-wide">RM HUB</h1>
                <p className="text-[10px] text-slate-500">Resource Management</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mx-auto">
              <Building2 className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || (item.id !== "dashboard" && pathname.startsWith(item.path));
            return (
              <Link key={item.id} href={item.path}
                className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                  isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                )}>
                <Icon className="w-4 h-4 flex-shrink-0" />{!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <button onClick={() => setCollapsed(!collapsed)} className="p-3 border-t border-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center">
          <ChevronRight className={cn("w-4 h-4 transition-transform", collapsed ? "" : "rotate-180")} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50">{children}</main>
    </div>
  );
}
