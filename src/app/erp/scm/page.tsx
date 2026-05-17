"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, Warehouse } from "lucide-react";

const MATERIALS = [
  { id: "MAT-001", name: "Steel Sheet 3mm", stock: 500, unit: "sheets", reorder: 200, status: "OK" },
  { id: "MAT-002", name: "Aluminum Profile 40mm", stock: 120, unit: "m", reorder: 150, status: "Reorder" },
  { id: "MAT-003", name: "Electronic Controller v2", stock: 45, unit: "pcs", reorder: 30, status: "OK" },
  { id: "MAT-004", name: "Packaging Box Large", stock: 80, unit: "pcs", reorder: 100, status: "Reorder" },
  { id: "MAT-005", name: "Hydraulic Fluid 5L", stock: 25, unit: "cans", reorder: 20, status: "OK" },
];

export default function ERPSCMPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Supply Chain Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><Warehouse className="w-8 h-8 text-indigo-500" /><div><p className="text-xl font-bold text-slate-800">3</p><p className="text-xs text-slate-500">Warehouses</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Package className="w-8 h-8 text-amber-500" /><div><p className="text-xl font-bold text-slate-800">5</p><p className="text-xs text-slate-500">Active Suppliers</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Truck className="w-8 h-8 text-green-500" /><div><p className="text-xl font-bold text-slate-800">2</p><p className="text-xs text-slate-500">In Transit</p></div></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Materials & Inventory</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-3 font-medium">Code</th>
                  <th className="pb-3 font-medium">Material</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium">Reorder Level</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {MATERIALS.map((m) => (
                  <tr key={m.id} className="border-b last:border-0">
                    <td className="py-3 text-slate-500">{m.id}</td>
                    <td className="py-3 font-medium text-slate-800">{m.name}</td>
                    <td className="py-3">{m.stock} {m.unit}</td>
                    <td className="py-3">{m.reorder} {m.unit}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        m.status === "OK" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>{m.status}</span>
                    </td>
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
