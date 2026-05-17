"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog, Settings, Package, Calendar } from "lucide-react";

const ORDERS = [
  { id: "PO-2026-050", product: "Widget A-200", qty: 500, status: "In Progress", start: "2026-05-10", end: "2026-05-25", progress: 45 },
  { id: "PO-2026-049", product: "Component X-100", qty: 300, status: "Planned", start: "2026-05-20", end: "2026-06-05", progress: 0 },
  { id: "PO-2026-048", product: "Assembly Kit B", qty: 150, status: "Completed", start: "2026-05-01", end: "2026-05-14", progress: 100 },
  { id: "PO-2026-047", product: "Sensor Module C", qty: 200, status: "In Progress", start: "2026-05-08", end: "2026-05-22", progress: 60 },
];

const WORK_CENTERS = [
  { name: "Assembly Line 1", load: 85, status: "Operational" },
  { name: "Machining Bay", load: 60, status: "Operational" },
  { name: "Quality Control", load: 40, status: "Operational" },
  { name: "Packaging Unit", load: 70, status: "Maintenance" },
];

export default function ProductionPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Production</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Production Orders</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ORDERS.map((po) => (
                <div key={po.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{po.product}</p>
                      <p className="text-xs text-slate-500">{po.id} • Qty: {po.qty}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      po.status === "Completed" ? "bg-green-100 text-green-700" :
                      po.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-700"
                    }`}>{po.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Calendar className="w-3 h-3" />{po.start} → {po.end}
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${po.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'}`} style={{width: `${po.progress}%`}}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{po.progress}% complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Work Centers</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {WORK_CENTERS.map((wc) => (
                <div key={wc.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Cog className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{wc.name}</p>
                      <span className={`text-xs ${
                        wc.status === "Operational" ? "text-green-600" : "text-amber-600"
                      }`}>{wc.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">{wc.load}%</p>
                    <p className="text-xs text-slate-500">Load</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
