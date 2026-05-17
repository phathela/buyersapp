"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const QUEUE = [
  { id: "SR-2026-042", subject: "Laptop replacement request", requester: "John D.", category: "IT Support", status: "Open", priority: "High", age: "2h" },
  { id: "SR-2026-041", subject: "Projector bulb replacement", requester: "Sarah W.", category: "Facilities", status: "Open", priority: "Medium", age: "5h" },
  { id: "SR-2026-040", subject: "Software license renewal", requester: "Mike R.", category: "IT Support", status: "In Progress", priority: "High", age: "1d" },
  { id: "SR-2026-039", subject: "Vehicle booking - Conference", requester: "Jane M.", category: "Logistics", status: "Open", priority: "Low", age: "2d" },
  { id: "SR-2026-038", subject: "Medical checkup appointment", requester: "Dr. T.", category: "Medical", status: "In Progress", priority: "Medium", age: "2d" },
  { id: "SR-2026-037", subject: "Stationery order - Dept A", requester: "Peter K.", category: "Office Supply", status: "Open", priority: "Low", age: "3d" },
];

export default function ServiceDeskPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Service Desk</h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input className="pl-9 w-64" placeholder="Search requests..." />
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Unified Request Queue</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Subject</th>
                  <th className="pb-3 font-medium">Requester</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Age</th>
                </tr>
              </thead>
              <tbody>
                {QUEUE.map((req) => (
                  <tr key={req.id} className="border-b last:border-0 hover:bg-slate-50 cursor-pointer">
                    <td className="py-3 text-slate-500">{req.id}</td>
                    <td className="py-3 font-medium text-slate-800">{req.subject}</td>
                    <td className="py-3 text-slate-500">{req.requester}</td>
                    <td className="py-3 text-slate-500">{req.category}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        req.status === "Open" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                      }`}>{req.status}</span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        req.priority === "High" ? "bg-red-100 text-red-700" :
                        req.priority === "Medium" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>{req.priority}</span>
                    </td>
                    <td className="py-3 text-slate-500">{req.age}</td>
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
