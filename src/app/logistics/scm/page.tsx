"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Package, TrendingUp, Clock } from "lucide-react";

const ORDERS = [
  { id: "PO-2026-001", item: "Office Stationery Pack", supplier: "OfficeMax SA", qty: 50, status: "Delivered", date: "2026-05-10" },
  { id: "PO-2026-002", item: "IT Equipment Bundle", supplier: "Dell Technologies", qty: 10, status: "In Transit", date: "2026-05-15" },
  { id: "PO-2026-003", item: "Cleaning Supplies", supplier: "CleanCo", qty: 100, status: "Pending", date: "2026-05-18" },
  { id: "PO-2026-004", item: "Furniture Order", supplier: "Steelcase", qty: 15, status: "Processing", date: "2026-05-20" },
  { id: "PO-2026-005", item: "Network Equipment", supplier: "Cisco Systems", qty: 5, status: "Pending", date: "2026-05-22" },
];

export default function SCMPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Supply Chain Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4 flex items-center gap-3"><Package className="w-8 h-8 text-amber-500" /><div><p className="text-2xl font-bold text-slate-800">5</p><p className="text-xs text-slate-500">Active Orders</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><TrendingUp className="w-8 h-8 text-green-500" /><div><p className="text-2xl font-bold text-slate-800">R245K</p><p className="text-xs text-slate-500">Total Value</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Clock className="w-8 h-8 text-amber-500" /><div><p className="text-2xl font-bold text-slate-800">2</p><p className="text-xs text-slate-500">Pending</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><ClipboardList className="w-8 h-8 text-blue-500" /><div><p className="text-2xl font-bold text-slate-800">12</p><p className="text-xs text-slate-500">Suppliers</p></div></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Purchase Orders</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-3 font-medium">PO Number</th>
                  <th className="pb-3 font-medium">Item</th>
                  <th className="pb-3 font-medium">Supplier</th>
                  <th className="pb-3 font-medium">Qty</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((po) => (
                  <tr key={po.id} className="border-b last:border-0">
                    <td className="py-3 text-slate-500">{po.id}</td>
                    <td className="py-3 font-medium text-slate-800">{po.item}</td>
                    <td className="py-3 text-slate-500">{po.supplier}</td>
                    <td className="py-3 text-slate-800">{po.qty}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        po.status === "Delivered" ? "bg-green-100 text-green-700" :
                        po.status === "In Transit" ? "bg-blue-100 text-blue-700" :
                        po.status === "Processing" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>{po.status}</span>
                    </td>
                    <td className="py-3 text-slate-500">{po.date}</td>
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
