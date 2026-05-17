"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const ITEMS = [
  { id: "AST-001", name: "Dell Latitude 5540", category: "Laptops", qty: 12, status: "In Stock", location: "Warehouse A" },
  { id: "AST-002", name: "HP LaserJet Pro", category: "Printers", qty: 3, status: "Low Stock", location: "Office B" },
  { id: "AST-003", name: "Samsung 27\" Monitor", category: "Displays", qty: 8, status: "In Stock", location: "Warehouse A" },
  { id: "AST-004", name: "Cisco Meraki MR56", category: "Networking", qty: 0, status: "Out of Stock", location: "-" },
  { id: "AST-005", name: "Logitech C920 Webcam", category: "Peripherals", qty: 25, status: "In Stock", location: "Warehouse B" },
  { id: "AST-006", name: "APC UPS 1500VA", category: "Power", qty: 2, status: "Low Stock", location: "Warehouse A" },
];

export default function InventoryPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Inventory</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9 w-64" placeholder="Search assets..." />
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg"><Filter className="w-4 h-4 text-slate-500" /></button>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Equipment & Assets</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-3 font-medium">Asset ID</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Qty</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Location</th>
                </tr>
              </thead>
              <tbody>
                {ITEMS.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-3 text-slate-500">{item.id}</td>
                    <td className="py-3 font-medium text-slate-800">{item.name}</td>
                    <td className="py-3 text-slate-500">{item.category}</td>
                    <td className="py-3 text-slate-800">{item.qty}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        item.status === "In Stock" ? "bg-green-100 text-green-700" :
                        item.status === "Low Stock" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>{item.status}</span>
                    </td>
                    <td className="py-3 text-slate-500">{item.location}</td>
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
