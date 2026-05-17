"use client";

import { Package, Box, Building2, Truck, ClipboardList } from "lucide-react";
import HubSidebar from "@/components/HubSidebar";

const NAV_ITEMS = [
  { id: "inventory", label: "Inventory", icon: Box, path: "/logistics/inventory", description: "Equipment & asset tracking" },
  { id: "offices", label: "Offices & Parking", icon: Building2, path: "/logistics/offices", description: "Office & parking management" },
  { id: "fleet", label: "Fleet", icon: Truck, path: "/logistics/fleet", description: "Vehicle fleet management" },
  { id: "scm", label: "SCM", icon: ClipboardList, path: "/logistics/scm", description: "Supply chain & procurement" },
];

export default function LogisticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <HubSidebar navItems={NAV_ITEMS} title="LOGISTICS HUB" subtitle="Supply Chain & Assets" icon={Package} gradient="from-amber-500 to-orange-600" activeBg="bg-amber-500" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
