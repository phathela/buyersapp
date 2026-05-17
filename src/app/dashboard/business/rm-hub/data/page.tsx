"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, DollarSign, FileText, Plus, ChevronRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportSummary {
  headcount: { total: number; active: number; byDepartment: Record<string, number> };
  turnover: { rate: number; period: string };
}

export default function DataReportsPage() {
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/business/rm-hub/reports/headcount")
      .then((r) => r.json())
      .then((data) => { setSummary(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const quickLinks = [
    { label: "Pre-built Reports", desc: "Headcount, turnover, payroll summaries", icon: FileText, path: "/dashboard/business/rm-hub/data/reports", color: "blue" },
    { label: "Custom Report Builder", desc: "Build your own with custom columns and filters", icon: BarChart3, path: "/dashboard/business/rm-hub/data/reports/custom", color: "purple" },
  ];

  const COLORS: Record<string, string> = {
    blue: "border-t-blue-500 text-blue-600 bg-blue-50",
    purple: "border-t-purple-500 text-purple-600 bg-purple-50",
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">HR Data & Reports</h1>
        <p className="text-sm text-slate-500">Analytics, pre-built reports, and custom data exports</p>
      </div>

      {/* Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <Users className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : summary?.headcount.active || 0}</p>
            <p className="text-xs text-slate-500">Active Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Users className="w-5 h-5 text-slate-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : summary?.headcount.total || 0}</p>
            <p className="text-xs text-slate-500">Total Headcount</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <TrendingUp className="w-5 h-5 text-amber-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : `${summary?.turnover.rate || 0}%`}</p>
            <p className="text-xs text-slate-500">Turnover Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <DollarSign className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : Object.keys(summary?.headcount.byDepartment || {}).length}</p>
            <p className="text-xs text-slate-500">Departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown */}
      {summary && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Headcount by Department</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(summary.headcount.byDepartment).map(([dept, count]) => {
                const max = Math.max(...Object.values(summary.headcount.byDepartment));
                return (
                  <div key={dept}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-700 font-medium">{dept}</span>
                      <span className="text-slate-500">{count}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${(count / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          const c = COLORS[link.color];
          return (
            <Link key={link.label} href={link.path}
              className={cn("block bg-white border border-slate-200 border-t-2 rounded-xl p-5 hover:shadow-md transition-all group", c.split(" ")[0])}>
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", c.split(" ")[2])}>
                  <Icon className={cn("w-5 h-5", c.split(" ")[1])} />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1">{link.label}</h3>
              <p className="text-xs text-slate-500">{link.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Available Reports</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: "Headcount Report", desc: "Total, active, and departmental breakdowns", type: "headcount" },
              { name: "Turnover Report", desc: "Employee turnover rate and trends", type: "turnover" },
              { name: "Payroll Summary", desc: "Payroll runs, totals, and period comparisons", type: "payroll" },
              { name: "Benefits Enrollment", desc: "Enrollment counts by benefit type", type: "benefits" },
            ].map((r) => (
              <div key={r.type} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-700">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.desc}</p>
                </div>
                <Link href={`/dashboard/business/rm-hub/data/reports?type=${r.type}`}>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4 mr-1" />View</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
