"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const REQUESTS = [
  { id: "SR-2026-042", subject: "Laptop replacement request", category: "IT Support", status: "In Progress", date: "2026-05-14", priority: "High" },
  { id: "SR-2026-041", subject: "Office stationery replenishment", category: "Office Supply", status: "Completed", date: "2026-05-12", priority: "Low" },
  { id: "SR-2026-040", subject: "Medical appointment booking", category: "Medical", status: "Open", date: "2026-05-10", priority: "Medium" },
  { id: "SR-2026-039", subject: "Vehicle request - Site visit", category: "Logistics", status: "Completed", date: "2026-05-08", priority: "Medium" },
  { id: "SR-2026-038", subject: "AC maintenance - Boardroom B", category: "Facilities", status: "In Progress", date: "2026-05-06", priority: "High" },
];

export default function MyRequestsPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">My Requests</h1>
      <Card>
        <CardHeader><CardTitle className="text-lg">Submitted Requests</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {REQUESTS.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    req.status === "Completed" ? "bg-green-100" : req.status === "In Progress" ? "bg-blue-100" : "bg-amber-100"
                  }`}>
                    {req.status === "Completed" ? <CheckCircle2 className="w-5 h-5 text-green-600" /> :
                     req.status === "In Progress" ? <Clock className="w-5 h-5 text-blue-600" /> :
                     <AlertCircle className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{req.subject}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{req.id}</span>
                      <span className="text-xs text-slate-300">|</span>
                      <span className="text-xs text-slate-400">{req.category}</span>
                      <span className="text-xs text-slate-300">|</span>
                      <span className="text-xs text-slate-400">{req.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    req.status === "Completed" ? "bg-green-100 text-green-700" :
                    req.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>{req.status}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    req.priority === "High" ? "bg-red-100 text-red-700" :
                    req.priority === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-700"
                  }`}>{req.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
