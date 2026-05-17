"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, FileText, Users } from "lucide-react";

const METRICS = [
  { label: "Total Requests (May)", value: 34, change: "+12%", icon: FileText, color: "text-teal-600", bg: "bg-teal-100" },
  { label: "Avg Resolution Time", value: "4.2h", change: "-8%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
  { label: "Satisfaction Rate", value: "94%", change: "+3%", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Open Requests", value: 7, change: "-2", icon: BarChart3, color: "text-amber-600", bg: "bg-amber-100" },
];

const CATEGORY_DATA = [
  { category: "IT Support", count: 12, pct: 35 },
  { category: "Logistics", count: 6, pct: 18 },
  { category: "Facilities", count: 8, pct: 24 },
  { category: "Office Supply", count: 5, pct: 15 },
  { category: "Medical", count: 3, pct: 8 },
];

export default function ReportsPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {METRICS.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${m.bg}`}><m.icon className={`w-6 h-6 ${m.color}`} /></div>
              <div>
                <p className="text-xs text-slate-500">{m.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-slate-800">{m.value}</p>
                  <span className="text-xs text-green-600">{m.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Requests by Category</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {CATEGORY_DATA.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700">{cat.category}</span>
                  <span className="text-slate-500">{cat.count} ({cat.pct}%)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${cat.pct * 2}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
