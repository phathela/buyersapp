"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Activity } from "lucide-react";

const KPI = [
  { label: "Revenue (MTD)", value: "R2.4M", change: "+8.2%", icon: DollarSign, color: "text-green-600", bg: "bg-green-100", up: true },
  { label: "Expenses", value: "R1.1M", change: "+3.5%", icon: Activity, color: "text-red-600", bg: "bg-red-100", up: false },
  { label: "Inventory Value", value: "R4.8M", change: "-2.1%", icon: Package, color: "text-blue-600", bg: "bg-blue-100", up: false },
  { label: "Active Projects", value: "12", change: "+2", icon: Users, color: "text-indigo-600", bg: "bg-indigo-100", up: true },
];

const AI_SUGGESTIONS = [
  "Inventory turnover decreased 15% this quarter — consider reviewing slow-moving stock items.",
  "Three supplier invoices are overdue for more than 30 days — initiate payment run.",
  "Production order PO-2026-042 is ahead of schedule — consider reallocating labor hours.",
];

export default function ERPDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">ERP Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {KPI.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${k.bg}`}><k.icon className={`w-5 h-5 ${k.color}`} /></div>
                <span className={`text-xs font-medium flex items-center gap-1 ${k.up ? 'text-green-600' : 'text-red-600'}`}>
                  {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {k.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{k.value}</p>
              <p className="text-xs text-slate-500">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-5">
          <h2 className="font-semibold text-slate-800 mb-3">AI Suggestions</h2>
          <div className="space-y-2">
            {AI_SUGGESTIONS.map((s, i) => (
              <div key={i} className="flex items-start gap-2 p-2 hover:bg-indigo-50 rounded text-sm text-slate-700">
                <Activity className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
