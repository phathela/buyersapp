"use client";

import { Briefcase, FileBarChart, Table2, Languages, Mic, BrainCircuit, PenTool, ShieldCheck } from "lucide-react";
import HubSidebar from "@/components/HubSidebar";

const NAV_ITEMS = [
  { id: "files", label: "Reports Generator", icon: FileBarChart, path: "/smart-office/files", description: "AI-powered reports & document intelligence" },
  { id: "excel", label: "Power Excel", icon: Table2, path: "/smart-office/excel", description: "AI-powered spreadsheet assistant" },
  { id: "translate", label: "Translate", icon: Languages, path: "/smart-office/translate", description: "Document & text translation" },
  { id: "transcribe", label: "Transcribe", icon: Mic, path: "/smart-office/transcribe", description: "Audio & video transcription" },
  { id: "transcribe-d", label: "Call Transcription D", icon: BrainCircuit, path: "/smart-office/transcribe-d", description: "Whisper & DeepSeek transcription" },
  { id: "ai-editor", label: "AI Editor", icon: PenTool, path: "/smart-office/ai-editor", description: "AI-powered editing & tone adjustment" },
  { id: "ai-authenticator", label: "AI-Authenticator", icon: ShieldCheck, path: "/smart-office/ai-authenticator", description: "Verify, detect & authenticate content" },
];

export default function SmartOfficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <HubSidebar navItems={NAV_ITEMS} title="SMART OFFICE" subtitle="AI-Powered Workspace" icon={Briefcase} gradient="from-rose-500 to-orange-500" activeBg="bg-rose-500" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
