"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, ListChecks, ClipboardList, Headphones, ArrowRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Open Requests", value: 7, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
  { label: "In Progress", value: 4, icon: Clock, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Completed", value: 23, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
  { label: "Total", value: 34, icon: ListChecks, color: "text-teal-600", bg: "bg-teal-100" },
];

const QUICK_LINKS = [
  { label: "New Request", icon: PlusCircle, path: "/request-service/new-request", color: "text-teal-600" },
  { label: "My Requests", icon: ListChecks, path: "/request-service/my-requests", color: "text-blue-600" },
  { label: "My Assigned", icon: ClipboardList, path: "/request-service/my-assigned", color: "text-amber-600" },
  { label: "Service Desk", icon: Headphones, path: "/request-service/service-desk", color: "text-purple-600" },
];

export default function RequestServiceDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Service Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}><stat.icon className={`w-6 h-6 ${stat.color}`} /></div>
              <div><p className="text-2xl font-bold text-slate-800">{stat.value}</p><p className="text-xs text-slate-500">{stat.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {QUICK_LINKS.map((link) => (
              <Link key={link.path} href={link.path} className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors">
                <link.icon className={`w-5 h-5 ${link.color}`} />
                <span className="text-sm font-medium text-slate-700">{link.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
