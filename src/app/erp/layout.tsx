"use client";

import { LayoutDashboard, Receipt, Package, Cog, Bot, FileText } from "lucide-react";
import HubSidebar from "@/components/HubSidebar";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/erp/dashboard", description: "KPI overview & AI suggestions" },
  { id: "finance", label: "Finance", icon: Receipt, path: "/erp/finance", description: "GL, AP, AR, trial balance & cash forecast" },
  { id: "scm", label: "SCM", icon: Package, path: "/erp/scm", description: "Materials, inventory & purchase orders" },
  { id: "production", label: "Production", icon: Cog, path: "/erp/production", description: "BOM, work centers & production orders" },
  { id: "assistant", label: "AI Assistant", icon: Bot, path: "/erp/assistant", description: "Joule-like ERP copilot" },
  { id: "documents", label: "Documents", icon: FileText, path: "/erp/documents", description: "AI document processing & extraction" },
];

export default function ERPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <HubSidebar navItems={NAV_ITEMS} title="O-BAISE ERP" subtitle="Enterprise Resource Planning" icon={LayoutDashboard} gradient="from-indigo-500 to-purple-600" activeBg="bg-indigo-500" />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
