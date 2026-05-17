"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users, Briefcase, BarChart3, Clock, Gift, HeartHandshake,
  TrendingUp, DollarSign, ArrowRight, Activity, ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TOOLS = [
  { id: "hiring", label: "Hiring & Onboarding", icon: Briefcase, path: "/dashboard/business/rm-hub/hiring", desc: "Post jobs, track candidates, onboard new hires", color: "blue" },
  { id: "employees", label: "Employees", icon: Users, path: "/dashboard/business/rm-hub/employees", desc: "Manage your team directory", color: "indigo" },
  { id: "data", label: "HR Data & Reports", icon: BarChart3, path: "/dashboard/business/rm-hub/data", desc: "Reports, analytics & dashboards", color: "cyan" },
  { id: "payroll", label: "Payroll & Time", icon: Clock, path: "/dashboard/business/rm-hub/payroll", desc: "Time tracking, shifts & payroll", color: "amber" },
  { id: "benefits", label: "Benefits", icon: Gift, path: "/dashboard/business/rm-hub/benefits", desc: "Manage enrollments & staff discounts", color: "green" },
  { id: "experience", label: "Employee Experience", icon: HeartHandshake, path: "/dashboard/business/rm-hub/experience", desc: "Surveys, recognition & culture", color: "pink" },
  { id: "performance", label: "Performance", icon: TrendingUp, path: "/dashboard/business/rm-hub/performance", desc: "Reviews, OKRs & 360 feedback", color: "purple" },
  { id: "compensation", label: "Compensation", icon: DollarSign, path: "/dashboard/business/rm-hub/compensation", desc: "Salary bands, commissions & rewards", color: "red" },
];

const COLORS: Record<string, { border: string; text: string; bg: string }> = {
  blue: { border: "border-t-blue-500", text: "text-blue-600", bg: "bg-blue-50" },
  indigo: { border: "border-t-indigo-500", text: "text-indigo-600", bg: "bg-indigo-50" },
  cyan: { border: "border-t-cyan-500", text: "text-cyan-600", bg: "bg-cyan-50" },
  amber: { border: "border-t-amber-500", text: "text-amber-600", bg: "bg-amber-50" },
  green: { border: "border-t-green-500", text: "text-green-600", bg: "bg-green-50" },
  pink: { border: "border-t-pink-500", text: "text-pink-600", bg: "bg-pink-50" },
  purple: { border: "border-t-purple-500", text: "text-purple-600", bg: "bg-purple-50" },
  red: { border: "border-t-red-500", text: "text-red-600", bg: "bg-red-50" },
};

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  employeeChange: number;
  openPositions: number;
  pendingTimeEntries: number;
  totalPayrollThisMonth: number;
  currentMonthEntries: number;
  recentActivity: { type: string; text: string; time: string }[];
}

export default function RMHubDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/business/rm-hub/dashboard-stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Resource Management Hub</h1>
        <p className="text-sm text-slate-500">Manage your team, hiring, payroll, and operations</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className={cn("text-xs font-medium", stats && stats.employeeChange >= 0 ? "text-green-600" : "text-red-600")}>
                {stats ? `${stats.employeeChange >= 0 ? "+" : ""}${stats.employeeChange}%` : "—"}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stats?.activeEmployees || 0}</p>
            <p className="text-xs text-slate-500">Active Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Briefcase className="w-5 h-5 text-amber-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{stats?.openPositions || 0}</p>
            <p className="text-xs text-slate-500">Open Positions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Clock className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{stats?.pendingTimeEntries || 0}</p>
            <p className="text-xs text-slate-500">Active Clocks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <DollarSign className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">${stats?.totalPayrollThisMonth.toLocaleString() || 0}</p>
            <p className="text-xs text-slate-500">Payroll (MTD)</p>
          </CardContent>
        </Card>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const c = COLORS[tool.color];
          return (
            <Link key={tool.id} href={tool.path}
              className={cn("block bg-white border border-slate-200 border-t-2 rounded-xl p-5 hover:shadow-md transition-all group", c.border)}>
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", c.bg)}>
                  <Icon className={cn("w-5 h-5", c.text)} />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1">{tool.label}</h3>
              <p className="text-xs text-slate-500">{tool.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-5">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-500" />
            Recent Activity
          </h2>
          {stats?.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    activity.type === "application" ? "bg-blue-500" :
                    activity.type === "review" ? "bg-purple-500" : "bg-slate-400"
                  )} />
                  <div>
                    <p className="text-sm text-slate-700">{activity.text}</p>
                    <p className="text-xs text-slate-400">{new Date(activity.time).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Activity className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">No recent activity</p>
              <p className="text-xs">Start by adding employees or posting a job</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
