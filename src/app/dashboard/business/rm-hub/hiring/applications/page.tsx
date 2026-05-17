"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  applied: "bg-slate-100 text-slate-700",
  screening: "bg-blue-100 text-blue-700",
  interview: "bg-amber-100 text-amber-700",
  offer: "bg-purple-100 text-purple-700",
  hired: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const MOCK_APPLICANTS = [
  { id: "a1", name: "Alice M.", position: "Senior Deal Negotiator", status: "interview", applied: "2026-05-12" },
  { id: "a2", name: "Bob K.", position: "Senior Deal Negotiator", status: "screening", applied: "2026-05-14" },
  { id: "a3", name: "Carol S.", position: "Logistics Coordinator", status: "applied", applied: "2026-05-15" },
  { id: "a4", name: "David L.", position: "Logistics Coordinator", status: "interview", applied: "2026-05-10" },
  { id: "a5", name: "Eve R.", position: "Customer Success Mgr", status: "offer", applied: "2026-05-08" },
];

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? MOCK_APPLICANTS : MOCK_APPLICANTS.filter((a) => a.status === filter);
  const columns = ["applied", "screening", "interview", "offer", "hired", "rejected"];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Link href="/dashboard/business/rm-hub/hiring" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Hiring
      </Link>
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mt-2">Application Tracker</h1>

      {/* Kanban Board */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 overflow-x-auto">
        {columns.map((col) => (
          <div key={col} className="bg-slate-50 rounded-xl p-3 min-w-[150px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-700 capitalize">{col}</h3>
              <span className="text-xs bg-white px-2 py-0.5 rounded text-slate-500">
                {MOCK_APPLICANTS.filter((a) => a.status === col).length}
              </span>
            </div>
            <div className="space-y-2">
              {MOCK_APPLICANTS.filter((a) => a.status === col).map((a) => (
                <div key={a.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                  <p className="text-sm font-medium text-slate-800">{a.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{a.position}</p>
                  <p className="text-xs text-slate-400 mt-1">{a.applied}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Table View */}
      <Card>
        <CardHeader><CardTitle className="text-lg">All Candidates</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-slate-500">
                <th className="pb-3 font-medium">Name</th><th className="pb-3 font-medium">Position</th>
                <th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Applied</th>
              </tr></thead>
              <tbody>
                {MOCK_APPLICANTS.map((a) => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-800">{a.name}</td>
                    <td className="py-3 text-slate-500">{a.position}</td>
                    <td className="py-3"><Badge className={STATUS_COLORS[a.status]}>{a.status}</Badge></td>
                    <td className="py-3 text-slate-500">{a.applied}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
