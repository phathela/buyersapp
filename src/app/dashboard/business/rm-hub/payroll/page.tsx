"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Calendar, Play, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStats {
  pendingTimeEntries: number;
  currentMonthEntries: number;
  totalPayrollThisMonth: number;
}

export default function PayrollPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/business/rm-hub/dashboard-stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const tools = [
    { label: "Timesheets", desc: "View and manage time entries", icon: Clock, path: "/dashboard/business/rm-hub/payroll/timesheets", color: "blue" },
    { label: "Payroll Runs", desc: "Process payroll and view history", icon: DollarSign, path: "/dashboard/business/rm-hub/payroll/runs", color: "green" },
  ];

  const COLORS: Record<string, string> = {
    blue: "border-t-blue-500 text-blue-600 bg-blue-50",
    green: "border-t-green-500 text-green-600 bg-green-50",
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Payroll & Time</h1>
        <p className="text-sm text-slate-500">Time tracking, timesheets, and payroll processing</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <Clock className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : stats?.pendingTimeEntries || 0}</p>
            <p className="text-xs text-slate-500">Active Clocks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Calendar className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : stats?.currentMonthEntries || 0}</p>
            <p className="text-xs text-slate-500">Entries This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <DollarSign className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">${loading ? "—" : stats?.totalPayrollThisMonth?.toLocaleString() || 0}</p>
            <p className="text-xs text-slate-500">Payroll MTD</p>
          </CardContent>
        </Card>
      </div>

      {/* Tool Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const c = COLORS[tool.color];
          return (
            <Link key={tool.label} href={tool.path}
              className={cn("block bg-white border border-slate-200 border-t-2 rounded-xl p-5 hover:shadow-md transition-all group", c.split(" ")[0])}>
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", c.split(" ")[2])}>
                  <Icon className={cn("w-5 h-5", c.split(" ")[1])} />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1">{tool.label}</h3>
              <p className="text-xs text-slate-500">{tool.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/dashboard/business/rm-hub/payroll/timesheets">
            <Button variant="outline" size="sm"><Clock className="w-4 h-4 mr-2" />View Timesheets</Button>
          </Link>
          <Link href="/dashboard/business/rm-hub/payroll/runs">
            <Button variant="outline" size="sm"><DollarSign className="w-4 h-4 mr-2" />Payroll History</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
