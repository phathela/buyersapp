"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Briefcase, MessageSquare, Monitor, BookOpen, Bell, Gift, Package, LifeBuoy,
  LayoutDashboard, Bot, ChevronRight, LogOut, Settings, Shield, Users, Zap, Menu, X,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const auth = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hubs = [
    { path: "/smart-office", icon: Briefcase, name: "Smart Office", desc: "Documents, Excel, Translation & Files", color: "rose" },
    { path: "/comms-centre", icon: MessageSquare, name: "Comms Centre", desc: "Chat, Meetings, Tasks & Collaboration", color: "violet" },
    { path: "/monitoring-centre", icon: Monitor, name: "Monitoring Centre", desc: "Live drone & camera feeds, alerts", color: "red" },
    { path: "/knowledge-centre", icon: BookOpen, name: "Knowledge Centre", desc: "SOPs, templates & documentation", color: "cyan" },
    { path: "/alerts", icon: Bell, name: "Alerts Hub", desc: "Breaking news, weather, traffic & more", color: "blue" },
    { path: "/rewards", icon: Gift, name: "Rewards Centre", desc: "Competitions, offers & AI credits", color: "amber" },
    { path: "/logistics", icon: Package, name: "Logistics Hub", desc: "Asset inventory, fleet management & SCM", color: "amber" },
    { path: "/request-service", icon: LifeBuoy, name: "Request Service", desc: "IT, logistics, medical, security & office supply", color: "teal" },
    { path: "/erp", icon: LayoutDashboard, name: "ERP Hub", desc: "Finance, SCM, production & AI-powered ERP", color: "indigo" },
    { path: "/dashboard/business/rm-hub", icon: Building2, name: "RM Hub", desc: "Employees, hiring, payroll & performance management", color: "emerald" },
  ];

  const colorMap: Record<string, { border: string; text: string; bg: string }> = {
    rose: { border: "border-t-rose-500", text: "text-rose-400", bg: "bg-rose-500/10" },
    violet: { border: "border-t-violet-500", text: "text-violet-400", bg: "bg-violet-500/10" },
    red: { border: "border-t-red-500", text: "text-red-400", bg: "bg-red-500/10" },
    cyan: { border: "border-t-cyan-500", text: "text-cyan-400", bg: "bg-cyan-500/10" },
    blue: { border: "border-t-blue-500", text: "text-blue-400", bg: "bg-blue-500/10" },
    amber: { border: "border-t-amber-500", text: "text-amber-400", bg: "bg-amber-500/10" },
    teal: { border: "border-t-teal-500", text: "text-teal-400", bg: "bg-teal-500/10" },
    indigo: { border: "border-t-indigo-500", text: "text-indigo-400", bg: "bg-indigo-500/10" },
    emerald: { border: "border-t-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  };

  const handleLogout = async () => {
    await auth.logout();
    router.push("/");
  };

  if (auth.loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-['Barlow_Condensed'] text-lg sm:text-xl font-semibold tracking-tight text-white">
              BUYERSAPP
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="border-violet-400/30 text-violet-300 hover:bg-violet-500/10 rounded-none">
                Back to Home
              </Button>
            </Link>

            <div className="sm:hidden">
              <Button variant="ghost" className="p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="w-5 h-5 text-slate-300" />
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                    <AvatarImage src={auth.user?.image} />
                    <AvatarFallback className="bg-slate-200 text-slate-600 text-xs sm:text-sm">
                      {auth.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-slate-200 text-sm hidden sm:inline">{auth.user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-800 rounded-none shadow-lg text-slate-200">
                <DropdownMenuItem className="text-slate-200">{auth.user?.email}</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-lg" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 flex flex-col items-center justify-start pt-20 px-6 gap-2">
            <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="w-full py-4 text-center text-red-400 border border-red-400/20 hover:bg-red-500/10 text-base transition-colors mt-4">
              <LogOut className="w-5 h-5 inline mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Welcome to BuyersApp
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Your deal marketplace and business operations hub
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {hubs.map((hub, idx) => {
            const Icon = hub.icon;
            const colors = colorMap[hub.color];
            return (
              <Link
                key={hub.path}
                href={hub.path}
                className={`block bg-slate-900/80 border border-white/10 border-t-2 ${colors.border} p-6 card-hover group fade-in stagger-${idx + 1}`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${colors.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-slate-200 transition-colors" />
                </div>
                <h3 className="font-['Barlow_Condensed'] text-xl font-semibold text-white mb-1">{hub.name}</h3>
                <p className="text-sm text-slate-400">{hub.desc}</p>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-6">
            <h3 className="font-['Barlow_Condensed'] text-xl font-semibold text-white mb-4">
              Quick Access
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/alerts"><Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-white/5 rounded-none">Alerts Hub</Button></Link>
              <Link href="/rewards"><Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-white/5 rounded-none">Rewards Centre</Button></Link>
              <Link href="/request-service"><Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-white/5 rounded-none">Request Service</Button></Link>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 p-6">
            <h3 className="font-['Barlow_Condensed'] text-xl font-semibold text-white mb-4">
              Deal Marketplace
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Find the best deals near you. Save money. Buy smarter.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Deals</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
