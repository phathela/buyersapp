"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Clock, CheckCircle2 } from "lucide-react";

const ASSIGNED = [
  { id: "SR-2026-035", subject: "Network switch replacement", from: "John D.", status: "In Progress", date: "2026-05-15", priority: "High" },
  { id: "SR-2026-034", subject: "Printer toner refill - 3rd Floor", from: "Sarah W.", status: "Open", date: "2026-05-14", priority: "Medium" },
  { id: "SR-2026-033", subject: "Security audit - Access logs", from: "Mike R.", status: "Completed", date: "2026-05-12", priority: "High" },
  { id: "SR-2026-032", subject: "Meeting room booking system", from: "Jane M.", status: "In Progress", date: "2026-05-11", priority: "Low" },
];

export default function MyAssignedPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">My Assigned</h1>
      <Card>
        <CardHeader><CardTitle className="text-lg">Tasks Assigned to You</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ASSIGNED.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    task.status === "Completed" ? "bg-green-100" : task.status === "In Progress" ? "bg-blue-100" : "bg-amber-100"
                  }`}>
                    {task.status === "Completed" ? <CheckCircle2 className="w-5 h-5 text-green-600" /> :
                     task.status === "In Progress" ? <Clock className="w-5 h-5 text-blue-600" /> :
                     <ClipboardList className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{task.subject}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{task.id}</span>
                      <span className="text-xs text-slate-300">|</span>
                      <span className="text-xs text-slate-400">From: {task.from}</span>
                      <span className="text-xs text-slate-300">|</span>
                      <span className="text-xs text-slate-400">{task.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    task.status === "Completed" ? "bg-green-100 text-green-700" :
                    task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>{task.status}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    task.priority === "High" ? "bg-red-100 text-red-700" :
                    task.priority === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-700"
                  }`}>{task.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
