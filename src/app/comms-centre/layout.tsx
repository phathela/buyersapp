"use client";

import { MessageSquare, Users, Video, CheckSquare, Phone, Bot, Megaphone, Mail, Languages } from "lucide-react";
import HubSidebar from "@/components/HubSidebar";

const NAV_ITEMS = [
  { id: "chat", label: "Chat", icon: MessageSquare, path: "/comms-centre/chat", description: "Direct messaging" },
  { id: "groups", label: "Group Chat", icon: Users, path: "/comms-centre/groups", description: "Team conversations" },
  { id: "calls", label: "Calls", icon: Phone, path: "/comms-centre/calls", description: "Voice & video calls" },
  { id: "meetings", label: "Meetings", icon: Video, path: "/comms-centre/meetings", description: "Video conferences" },
  { id: "tasks", label: "Tasks Manager", icon: CheckSquare, path: "/comms-centre/tasks", description: "AI-powered task management" },
  { id: "ai-pals", label: "AI Pals", icon: Bot, path: "/comms-centre/ai-pals", description: "Communication analytics" },
  { id: "broadcast", label: "Broadcast", icon: Megaphone, path: "/comms-centre/broadcast", description: "Org-wide announcements" },
  { id: "mail", label: "Smart Mail", icon: Mail, path: "/comms-centre/mail/inbox", description: "Email, contacts & calendar" },
  { id: "toloky", label: "Toloky", icon: Languages, path: "/comms-centre/toloky", description: "AI interpreter & translation" },
];

export default function CommsCentreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <HubSidebar navItems={NAV_ITEMS} title="COMMS CENTRE" subtitle="Communication Hub" icon={MessageSquare} gradient="from-violet-500 to-purple-600" activeBg="bg-violet-500" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
