"use client";

import { useState } from "react";
import { Building2, Globe, Map, Earth, Handshake, Newspaper, Contact, BookOpen } from "lucide-react";
import HubSidebar from "@/components/HubSidebar";

const NAV_ITEMS = [
  { id: "internal-matters", label: "Internal Matters", icon: Building2, path: "/knowledge-centre/internal-matters", bgColor: "bg-blue-500", description: "SOPs, Forms, Policies & more" },
  { id: "thematic-matters", label: "Thematic Matters", icon: Globe, path: "/knowledge-centre/thematic-matters", bgColor: "bg-purple-500", description: "Political, Economic, Social & more" },
  { id: "national", label: "National", icon: Map, path: "/knowledge-centre/national", bgColor: "bg-green-500", description: "Provincial information" },
  { id: "continental", label: "Continental", icon: Earth, path: "/knowledge-centre/continental", bgColor: "bg-amber-500", description: "Africa, Europe, Asia & more" },
  { id: "multilaterals", label: "Multilaterals", icon: Handshake, path: "/knowledge-centre/multilaterals", bgColor: "bg-indigo-500", description: "UN, AU, EU, BRICS & more" },
  { id: "current-affairs", label: "Current Affairs", icon: Newspaper, path: "/knowledge-centre/current-affairs", bgColor: "bg-orange-500", description: "News & updates" },
  { id: "contacts", label: "Contacts", icon: Contact, path: "/knowledge-centre/contacts", bgColor: "bg-cyan-500", description: "Internal & external contacts" },
];

export default function KnowledgeCentreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <HubSidebar navItems={NAV_ITEMS} title="KNOWLEDGE CENTRE" subtitle="Document Management" icon={BookOpen} gradient="from-cyan-500 to-teal-500" activeBg="bg-cyan-500" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
