"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  description?: string;
  bgColor?: string;
  separator?: boolean;
}

interface HubSidebarProps {
  navItems: NavItem[];
  title?: string;
  subtitle?: string;
  icon?: React.ElementType | null;
  gradient?: string;
  activeBg?: string;
  backLink?: string;
  backLabel?: string;
  sidebarWidth?: string;
  sidebarFooter?: React.ReactNode;
}

export default function HubSidebar({
  navItems = [],
  title = "HUB",
  subtitle = "",
  icon: HubIcon = null,
  gradient = "from-violet-500 to-purple-600",
  activeBg = "bg-violet-500",
  backLink = "/dashboard",
  backLabel = "Back to Dashboard",
  sidebarWidth = "w-64",
  sidebarFooter = null,
}: HubSidebarProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile: Top bar + drawer */}
      <div className="md:hidden">
        <header className="fixed top-0 left-0 right-0 z-30 bg-slate-900 text-white flex items-center justify-between px-4 h-14 border-b border-slate-700">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-slate-300 hover:text-white"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {HubIcon && (
              <div className={cn("w-7 h-7 bg-gradient-to-br", gradient, "rounded flex items-center justify-center")}>
                <HubIcon className="w-4 h-4 text-white" />
              </div>
            )}
            <span className="font-['Barlow_Condensed'] text-base font-bold tracking-wide">{title}</span>
          </div>
          <div className="w-9" />
        </header>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        )}

        <div
          className={cn(
            "fixed top-0 left-0 z-50 h-full w-72 bg-slate-900 text-white transform transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className={cn("w-9 h-9 bg-gradient-to-br", gradient, "rounded-lg flex items-center justify-center")}>
                {HubIcon && <HubIcon className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h2 className="font-['Barlow_Condensed'] text-base font-bold tracking-wide">{title}</h2>
                {subtitle && <p className="text-[10px] text-slate-400">{subtitle}</p>}
              </div>
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-1 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <Link
            href={backLink}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>

          <nav className="p-3 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
            {navItems.map((item) => {
              if (item.separator) {
                return <div key="sep" className="border-t border-slate-700 my-2" />;
              }
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.path);
              const itemActiveBg = item.bgColor || activeBg;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-all",
                    isActive
                      ? `${itemActiveBg} text-white`
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="font-medium text-sm">{item.label}</p>
                    {item.description && <p className="text-xs opacity-70 truncate">{item.description}</p>}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="h-14" />
      </div>

      {/* Desktop: Sidebar */}
      <aside
        className={cn(
          "hidden md:flex bg-slate-900 text-white transition-all duration-300 flex-col",
          sidebarCollapsed ? "w-16" : sidebarWidth
        )}
      >
        <div className="p-4 border-b border-slate-700">
          <Link href={backLink} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            {!sidebarCollapsed && <span className="text-sm">{backLabel}</span>}
          </Link>

          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 bg-gradient-to-br", gradient, "rounded-lg flex items-center justify-center")}>
                {HubIcon && <HubIcon className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h1 className="font-['Barlow_Condensed'] text-lg font-bold tracking-wide">{title}</h1>
                {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
              </div>
            </div>
          )}

          {sidebarCollapsed && (
            <div className={cn("w-10 h-10 bg-gradient-to-br", gradient, "rounded-lg flex items-center justify-center mx-auto")}>
              {HubIcon && <HubIcon className="w-5 h-5 text-white" />}
            </div>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            if (item.separator) {
              return <div key="sep" className="border-t border-slate-700 my-2" />;
            }
            const Icon = item.icon;
            const isActive = pathname?.startsWith(item.path);
            const itemActiveBg = item.bgColor || activeBg;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all",
                  isActive
                    ? `${itemActiveBg} text-white`
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <div className="overflow-hidden">
                    <p className="font-medium text-sm">{item.label}</p>
                    {item.description && <p className="text-xs opacity-70 truncate">{item.description}</p>}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {sidebarFooter && <div className="border-t border-slate-700">{sidebarFooter}</div>}

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-4 border-t border-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
        >
          <ChevronRight className={cn("w-5 h-5 transition-transform", sidebarCollapsed ? "" : "rotate-180")} />
        </button>
      </aside>
    </>
  );
}
