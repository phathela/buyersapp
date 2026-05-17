"use client";

import { LifeBuoy, LayoutDashboard, PlusCircle, ListChecks, ClipboardList, Headphones, Calendar, Monitor, Package, BarChart3 } from "lucide-react";
import HubSidebar from "@/components/HubSidebar";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/request-service/dashboard", description: "Overview & quick links" },
  { id: "new-request", label: "New Request", icon: PlusCircle, path: "/request-service/new-request", description: "Submit a service request" },
  { id: "my-requests", label: "My Requests", icon: ListChecks, path: "/request-service/my-requests", description: "Your submitted requests" },
  { id: "my-assigned", label: "My Assigned", icon: ClipboardList, path: "/request-service/my-assigned", description: "Tasks assigned to you" },
  { id: "service-desk", label: "Service Desk", icon: Headphones, path: "/request-service/service-desk", description: "Unified request queue" },
  { id: "sep", label: "", icon: Package, path: "", separator: true, description: "" },
  { id: "medical-calendar", label: "Medical Calendar", icon: Calendar, path: "/request-service/medical-calendar", description: "Appointments & bookings" },
  { id: "it-inventory", label: "IT Inventory", icon: Monitor, path: "/request-service/it-inventory", description: "Hardware & IT assets" },
  { id: "office-supply", label: "Office Supply", icon: Package, path: "/request-service/office-supply", description: "Stationery & consumables" },
  { id: "reports", label: "Reports", icon: BarChart3, path: "/request-service/reports", description: "Analytics & volumes" },
];

export default function RequestServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <HubSidebar navItems={NAV_ITEMS} title="REQUEST SERVICE" subtitle="IT, Logistics, Medical & more" icon={LifeBuoy} gradient="from-teal-500 to-emerald-600" activeBg="bg-teal-500" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
